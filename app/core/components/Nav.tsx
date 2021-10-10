import React, { Suspense, useState } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SwipeableDrawer, { SwipeableDrawerProps } from "@material-ui/core/SwipeableDrawer"
import { makeStyles, Theme } from "@material-ui/core"
import { routes } from "app/core/routes"
import Link from "app/core/components/WrappedLink"
import getCurrentUserQuery from "app/users/queries/getCurrentUser"
import { invoke, useQuery } from "blitz"
import JpSuspense from "./JpSuspense"
import { isServer } from "app/utils"

const useStyles = makeStyles<Theme>((theme) => ({
  drawerRoot: {
    minWidth: 125,
  },
  menuButton: {
    marginTop: 12,
  },
  navItem: {
    color: theme.palette.primary.dark,
  },
}))

function NavDrawerContents() {
  const classes = useStyles()
  const [user, { status }] = useQuery(getCurrentUserQuery, null)
  console.log("🚀 ~ file: Nav.tsx ~ line 29 ~ NavDrawer ~ status", status)
  const routesMaybeWithLogout = [...routes]
  if (user) {
    routesMaybeWithLogout.push({
      id: "logout",
      href: "/api/logout",
      label: "Logout",
    })
  }

  return (
    <List className={classes.drawerRoot}>
      {routesMaybeWithLogout.map(({ id, href, label, subRoutes }) => (
        <>
          <ListItem key={id}>
            <ListItemText primaryTypographyProps={{ variant: "body2" }}>
              <Link className={classes.navItem} href={href}>
                {label}
              </Link>
            </ListItemText>
          </ListItem>
          {subRoutes?.map(({ id, href, label }) => (
            <ListItem key={id}>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                <Link className={classes.navItem} href={href}>
                  ↪ {label}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </>
      ))}
    </List>
  )
}

function NavDrawer({ open, onClose, onOpen }: SwipeableDrawerProps) {
  // Pre-fetch getcurrentuser
  // Test for not being on the server, as invoke on the server doesn't give
  // context to the query
  if (!isServer) {
    invoke(getCurrentUserQuery, null)
  }

  return (
    <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
      <JpSuspense name="NavDrawer">
        <NavDrawerContents />
      </JpSuspense>
    </SwipeableDrawer>
  )
}

export default function Nav() {
  const classes = useStyles()
  const [showNavDrawer, setShowNavDrawer] = useState(false)

  return (
    <>
      <div className={classes.menuButton}>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => setShowNavDrawer(!showNavDrawer)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
      </div>
      <NavDrawer
        open={showNavDrawer}
        onClose={() => setShowNavDrawer(false)}
        onOpen={() => setShowNavDrawer(true)}
      />
    </>
  )
}
