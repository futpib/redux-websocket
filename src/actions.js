/* eslint-env browser */
// @flow
import { WEBSOCKET_CONNECTING, WEBSOCKET_OPEN, WEBSOCKET_CLOSED, WEBSOCKET_MESSAGE } from './index';

// These actions are more concerned with connection state
// and are trigged async by the WebSocketMiddleware

export const connecting = (event: Event, websocket: ?WebSocket): Action => ({
  type: WEBSOCKET_CONNECTING,
  payload: {
    timestamp: new Date(),
    event,
    websocket
  }
});

export const open = (event: Event): Action => ({
  type: WEBSOCKET_OPEN,
  payload: {
    timestamp: new Date(),
    event
  }
});

export const closed = (event: Event): Action => ({
  type: WEBSOCKET_CLOSED,
  payload: {
    timestamp: new Date(),
    event
  }
});

const tryJSONParse = x => {
  try {
    return JSON.parse(x);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return x;
    }
    throw err;
  }
}

export const message = (event: MessageEvent): Action => ({
  type: WEBSOCKET_MESSAGE,
  payload: {
    timestamp: new Date(),
    data: tryJSONParse(event.data),
    event
  }
});

export default {};
