import { CircularProgress } from "@material-ui/core"

type LoadingWhileSuspendedProps = {
  name: string
  className?: string
}

const LoadingWhileSuspended: React.FC<LoadingWhileSuspendedProps> = ({ name, className }) => {
  // TBH this isn't that useful
  console.log(`Suspense loader shown for ${name}`)
  return <CircularProgress className={className} />
}

export default LoadingWhileSuspended
