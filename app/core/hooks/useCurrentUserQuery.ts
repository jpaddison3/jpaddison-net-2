import { useQuery } from "blitz"
import getCurrentUserQuery from "app/users/queries/getCurrentUser"
import { CurrentUser } from "app/users/helpers"

export const useCurrentUserQuery = (): CurrentUser | undefined => {
  const [user] = useQuery(getCurrentUserQuery, null)
  if (!user) {
    return
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}
