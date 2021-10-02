import { Image, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  profileImage: {
    borderRadius: "50%",
  },
}))

const Home: BlitzPage = () => {
  const classes = useStyles()

  return (
    <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
      <Grid item md={6}>
        <Typography variant="h2" component="h1" color="primary">
          JP Addison
        </Typography>

        <Typography gutterBottom>
          is a developer and{" "}
          <a href="https://www.effectivealtruism.org/articles/introduction-to-effective-altruism/">
            effective altruist
          </a>
          .
        </Typography>

        <Typography gutterBottom>
          I am the lead developer for the{" "}
          <a href="https://forum.effectivealtruism.org/">Effective Altruism Forum</a>. I contribute
          code to <a href="https://www.lesswrong.com/">LessWrong</a>, whose codebase I forked to
          make the Forum.
        </Typography>

        <Typography gutterBottom>
          You can find me elsewhere at <a href="https://github.com/jpaddison3">github</a> or{" "}
          <a href="https://www.linkedin.com/in/jpaddison3/">linkedin</a>.
        </Typography>

        <Typography gutterBottom>
          You can get in touch with me socially via{" "}
          <a href="https://www.facebook.com/jpaddison1.6">facebook</a> or{" "}
          <a href="mailto:johnpaddison@gmail.com">email</a>, or professionally via my{" "}
          <a href="mailto:jp@centreforeffectivealtruism.org">work email</a>.
        </Typography>
      </Grid>
      <Grid item md={5}>
        <Image
          src="/v1600099735/jp-profile.jpg"
          alt="profile image"
          width={160}
          height={160}
          className={classes.profileImage}
        />
      </Grid>
    </Grid>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
