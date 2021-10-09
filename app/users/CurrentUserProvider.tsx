import { useCurrentUserQuery } from "app/core/hooks/useCurrentUserQuery"
import React from "react"
import { CurrentUser } from "./helpers"

type CurrentUserProps = {
  currentUser?: CurrentUser
}

const CurrentUserContext = React.createContext<CurrentUserProps>({ currentUser: undefined })

const { Provider } = CurrentUserContext

export function CurrentUserProvider({
  children,
  currentUser,
}: {
  children: React.ReactNode
  currentUser?: CurrentUser
}) {
  return <Provider value={{ currentUser: currentUser }}>{children}</Provider>
}

export const useCurrentUserContext = () => React.useContext(CurrentUserContext)

// I want to make this function perform a server-side-render request, but for
// that we need to somehow set getServerSideProps

// ways to getcurrentuser
//  * let it loading spin on every page load, have provider
//  * try to work provider such that it doens't loading spin on logged out views
//  * dehydrate props on every page that needs a user
//  * database query for user on every page that needs a user
