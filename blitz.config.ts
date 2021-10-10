import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import { BlitzGuardMiddleware } from "@blitz-guard/core/dist/middleware"

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "jpaddisondotnet",
      isAuthorized: simpleRolesIsAuthorized,
    }),
    BlitzGuardMiddleware({
      excluded: [
        "/api/auth/mutations/login",
        "/api/auth/mutations/logout",
        "/api/guard/queries/getAbility",
        "/api/users/queries/getCurrentUser",
      ],
    }),
  ],
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/jpaddison/image/upload",
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config
