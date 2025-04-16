export const DEFAULT_URL = '/api/v1';

export const VIEWER_URLS = {
  callbackUrl: '/sign-up',
};

export const STREAMER_URLS = {
  callbackUrl: '/streamer/sign-up',
};
export const AUTH_URLS = {
  login: DEFAULT_URL + '/auth/login',
  logout: DEFAULT_URL + '/auth/logout',
};

export const SESSION_URLS = {
  contentsSession: DEFAULT_URL + '/contents/session',
  contentsParticipants: DEFAULT_URL + '/contents/session/participants',
};

export const SSE_URLS = {
  heartBeat: DEFAULT_URL + '/sse/session/heartbeat',
};

export const STORAGE_KEYS = {
  SSEStorageKey: 'SSE-storage',
  SessionStorageKey: 'contents-session-storage',
  ChannelStorageKey: 'channel-session-storage',
  AuthStorageKey: 'auth-session-storage',
};
