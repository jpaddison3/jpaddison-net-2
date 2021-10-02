import { Typography } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles<Theme>((theme) => ({}))

type ErrorPageComponentProps = {
  statusCode: number
  title: string
}

const ErrorPageComponent: React.FC<ErrorPageComponentProps> = ({ statusCode, title }) => {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h2" component="h1" color="primary">
        {statusCode}
      </Typography>

      <Typography>{title}</Typography>
    </>
  )
}

export default ErrorPageComponent
