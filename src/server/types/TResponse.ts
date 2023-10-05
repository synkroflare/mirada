export type TResponse = {
  meta: {
    status: number
    message: string
  }
  objects: unknown[] | null
}
