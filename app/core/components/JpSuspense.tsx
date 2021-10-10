import React, { Suspense } from "react"
import LoadingWhileSuspended from "./LoadingWhileSuspended"

type JpSuspenseProps = {
  name: string
  children: React.ReactNode
}

const JpSuspense: React.FC<JpSuspenseProps> = ({ name, children }) => {
  return <Suspense fallback={<LoadingWhileSuspended name={name} />}>{children}</Suspense>
}

export default JpSuspense
