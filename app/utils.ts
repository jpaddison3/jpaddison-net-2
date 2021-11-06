export interface HasUserId {
  userId: number
}

export interface MaybeHasUserId {
  userId?: number
}

export const isServer = typeof window === "undefined"

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T
