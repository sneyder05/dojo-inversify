export class NotFoundError extends Error {
  public readonly status = 404

  constructor(msg: string) {
    super(msg)
  }
}