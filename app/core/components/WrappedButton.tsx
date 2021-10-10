// https://gist.github.com/herr-vogel/0b5d4f3c28f08dc6cc4a2fd4f7b4a4df#gistcomment-3051542
import Button, { ButtonProps } from "@material-ui/core/Button"
import { Link, LinkProps } from "blitz"
import React from "react"

/**
 * We need to Omit from the MUI Button the {href} prop as we have to handle
 * routing with Next.js Router so we block the possibility to specify an href.
 */

export type ButtonLinkProps = Omit<ButtonProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch">

const ButtonLink = React.forwardRef<any, ButtonLinkProps>(
  ({ href, as, prefetch, ...props }, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <Button ref={ref} {...props} />
    </Link>
  )
)

ButtonLink.displayName = "ButtonLink"

export default ButtonLink
