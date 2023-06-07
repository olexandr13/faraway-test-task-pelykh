const config =  {
  url: 'http://127.0.0.1',
  port: 4000,
  paths: {
    events: 'events'
  },
}

export function getEndpoint(eventName: keyof typeof config.paths = 'events') {
  return `${config.url}:${config.port}/${config.paths[eventName]}`;
}
