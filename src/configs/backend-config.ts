const config =  {
  url: 'http://localhost',
  port: 4000,
  paths: {
    events: 'events'
  },
}

export function getEndpoint(eventName: keyof typeof config.paths = 'events') {
  return `${config.url}:${config.port}/${config.paths[eventName]}`;
}
