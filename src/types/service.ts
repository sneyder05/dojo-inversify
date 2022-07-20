export interface IService<T = void> {
  run(...args): Promise<T>
}