/* eslint-disable dot-notation */
export const TYPES = {
  AppConfig: Symbol.for('AppConfig'),
  Service: Symbol.for('Service'),
  Repository: Symbol.for('Repository'),
  InMemoryDB: Symbol.for('InMemoryDB'),
}

export const FACTORIES = {
  LokiCollection: Symbol.for('Factory<Loki.Collection>'),
}