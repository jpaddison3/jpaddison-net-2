import { User } from "db"

interface HasUserId {
  userId: number
}

export function canAccess(user: Pick<User, "id" | "role">, item: HasUserId) {
  if (user.role === "ADMIN") {
    return true
  }
  return user.id === item.userId
}
