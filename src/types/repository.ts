export interface IRepository<T = void> {
  exec(...args): Promise<T>
}