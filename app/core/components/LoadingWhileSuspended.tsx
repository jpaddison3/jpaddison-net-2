import { CircularProgress } from "@material-ui/core"

type LoadingWhileSuspendedProps = {
  name: string
}

const LoadingWhileSuspended: React.FC<LoadingWhileSuspendedProps> = ({ name }) => {
  // TBH this isn't that useful
  // console.log(`Suspense loader shown for ${name}`)
  return <CircularProgress />
}

export default LoadingWhileSuspended
