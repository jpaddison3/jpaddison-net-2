import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "TodoApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
      <footer>blah</footer>
    </>
  )
}

export default Layout
