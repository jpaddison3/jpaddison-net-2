import React, { useState } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SwipeableDrawer, { SwipeableDrawerProps } from "@material-ui/core/SwipeableDrawer"
import { makeStyles, Theme } from "@material-ui/core"
import { routes } from "app/core/routes"
import Link from "app/core/components/WrappedLink"

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

const NavDrawer = ({ open, onClose, onOpen }: SwipeableDrawerProps) => {
  const classes = useStyles()
  // const { user } = useUser()
  const routesMaybeWithLogout = routes
  // if (user) {
  //   routesMaybeWithLogout.push({
  //     id: 'logout',
  //     href: '/api/auth/logout',
  //     label: 'Logout'
  //   })
  // }

  return (
    <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
      <List className={classes.drawerRoot}>
        {routesMaybeWithLogout.map(({ id, href, label }) => (
          <ListItem key={id}>
            <ListItemText primaryTypographyProps={{ variant: "body2" }}>
              <Link className={classes.navItem} href={href}>
                {label}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
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
