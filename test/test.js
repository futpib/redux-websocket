/* eslint-env mocha */

import td from 'testdouble';
import expect from 'expect';
import middleware from '../src/';
import { createWebsocket } from '../src/websocket';
import { message } from '../src/actions';

// This does not exist in the Node env, but does in the browser
import WebSocket from 'ws';
global.WebSocket = WebSocket;

class Socket {

}

describe('middleware', () => {

  it('should be a curried function that calls next(action)', () => {
    const action = {};
    const next = td.func('next');

    middleware()(next)(action);

    td.verify(next(action));
  });

  it('should return values from next middlewares', () => {
    const expected = { dunno: 'Something a middleware could return (e.g. a promise)' };
    const action = { type: 'ACTION' };
    const next = td.func('next');
    td.when(next(action)).thenReturn(expected);

    const actual = middleware()(next)(action);

    expect(actual).toBe(expected);
  });

  it('should parse JSON payload', () => {
    const expected = { data: 'foof' };
    const event = { data: JSON.stringify(expected) };
    expect(message(event).payload.data).toEqual(expected);
  });

  it('should not parse non-JSON payload', () => {
    const expected = 'nah';
    const event = { data: expected };
    expect(message(event).payload.data).toEqual(expected);
  });

  context('createWebsocket', () => {
     it('should accept a default payload', () => {
       const payload = { url: 'ws://localhost' };

       const ws = createWebsocket(payload);
       expect(ws).toBeA(WebSocket);
     });

     it('accepts an alternative WebSocket', () => {
       const ws = createWebsocket({ websocket: Socket });
       expect(ws).toBeA(Socket);
     });
  });


});
