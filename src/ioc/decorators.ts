import { fluentProvide, } from 'inversify-binding-decorators'

export const provideSingleton = identifier => {
  return fluentProvide(identifier).inSingletonScope().done()
}

export const provideSingletonNamed = (identifier, named: string) => {
  return fluentProvide(identifier).inSingletonScope().whenTargetNamed(named).done()
}