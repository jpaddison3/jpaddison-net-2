import { useQuery } from "blitz"
import getCurrentUserQuery from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUserQuery, null)
  return user
}
