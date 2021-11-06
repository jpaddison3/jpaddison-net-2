import React, { Suspense } from "react"
import LoadingWhileSuspended from "./LoadingWhileSuspended"

type JpSuspenseProps = {
  name: string
  className?: string
  children: React.ReactNode
}

const JpSuspense: React.FC<JpSuspenseProps> = ({ name, children, className }) => {
  return (
    <Suspense fallback={<LoadingWhileSuspended name={name} className={className} />}>
      {children}
    </Suspense>
  )
}

export default JpSuspense
