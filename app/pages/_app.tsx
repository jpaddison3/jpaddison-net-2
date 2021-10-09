import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  GetServerSideProps,
  QueryClient,
  invokeWithMiddleware,
  getQueryKey,
  dehydrate,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"

import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import React, { Suspense } from "react"
import { theme } from "app/core/styles/theme"
import { CurrentUserProvider } from "app/users/CurrentUserProvider"
import getCurrentUserQuery from "app/users/queries/getCurrentUser"
import { useCurrentUserQuery } from "app/core/hooks/useCurrentUserQuery"
import { CircularProgress } from "@material-ui/core"

function InnerApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const currentUser = useCurrentUserQuery()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        <CurrentUserProvider currentUser={currentUser}>
          {getLayout(<Component {...pageProps} />)}
        </CurrentUserProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("getting props serverside ======= ")
  const queryClient = new QueryClient()
  const queryKey = getQueryKey(getCurrentUserQuery)

  await queryClient.prefetchQuery(queryKey, () =>
    invokeWithMiddleware(getCurrentUserQuery, null, context)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function OuterApp(props: AppProps) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <InnerApp {...props} />
    </Suspense>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
