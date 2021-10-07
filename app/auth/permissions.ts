import { HasUserId } from "app/utils"
import { User } from "db"

export function canAccess(user: Pick<User, "id" | "role">, item: HasUserId) {
  if (user.role === "ADMIN") {
    return true
  }
  return user.id === item.userId
}
