import React, { ReactChild } from "react"
import { Head, Routes } from "blitz"
import Container from "@material-ui/core/Container"
import Nav from "../components/Nav"

type LayoutProps = {
  title?: string
  children: ReactChild
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "TodoApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container fixed>
          <Nav />
          {children}
        </Container>
      </main>
    </>
  )
}

export default Layout
