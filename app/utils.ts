export interface HasUserId {
  userId: number
}

export interface MaybeHasUserId {
  userId?: number
}

export const isServer = typeof window === "undefined"
