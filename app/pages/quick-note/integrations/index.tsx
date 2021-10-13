import React, { Suspense, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIntegrations, {
  GetIntegrationsIntegration,
  GetIntegrationsReturn,
} from "app/integrations/queries/getIntegrations"
import JpSuspense from "app/core/components/JpSuspense"
import ButtonLink from "app/core/components/WrappedButton"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import deleteIntegration from "app/integrations/mutations/deleteIntegration"
import { QueryCacheFunctions } from "@blitzjs/core/dist/declarations/src/utils/react-query-utils"

const ITEMS_PER_PAGE = 100

const useStyles = makeStyles((theme) => ({
  createButton: {
    marginBottom: 32,
  },
  editIcons: {
    color: theme.palette.primary.dark,
  },
}))

type DeleteConfirmDialogProps = {
  open: boolean
  integration: GetIntegrationsIntegration | null
  handleClose: () => void
  refetch: Function
}

function DeleteConfirmDialog({
  open,
  integration,
  handleClose,
  refetch,
}: DeleteConfirmDialogProps) {
  const [deleteIntegrationMutation] = useMutation(deleteIntegration)

  async function handleYes() {
    await deleteIntegrationMutation({ id: integration!.id })
    void refetch()
    handleClose()
  }

  if (!open) return null

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Integration?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {integration!.name} — {integration!.service} | Are you sure you want to delete this
          integration?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleYes}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}

const IntegrationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ integrations, hasMore }, { refetch }] = usePaginatedQuery(getIntegrations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [integrationToDelete, setIntegrationToDelete] = useState<GetIntegrationsIntegration | null>(
    null
  )
  const classes = useStyles()

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <DeleteConfirmDialog
        open={!!integrationToDelete}
        integration={integrationToDelete}
        handleClose={() => setIntegrationToDelete(null)}
        refetch={refetch}
      />
      <Table>
        <TableBody>
          {integrations.map((integration) => (
            <TableRow key={integration.id}>
              <TableCell>{integration.name}</TableCell>
              <TableCell>{integration.service}</TableCell>
              <TableCell>
                <Link href={Routes.ShowIntegrationPage({ integrationId: integration.id })}>
                  <EditIcon className={classes.editIcons} />
                </Link>
              </TableCell>
              <TableCell>
                <a onClick={() => setIntegrationToDelete(integration)}>
                  <DeleteIcon className={classes.editIcons} />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {integrations.length > ITEMS_PER_PAGE && (
        <>
          <button disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </button>
          <button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </button>
        </>
      )}
    </>
  )
}

const IntegrationsPage: BlitzPage = () => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Integrations | Quick Note</title>
      </Head>

      <Typography variant="h2" component="h1" color="primary" gutterBottom>
        Integrations
      </Typography>

      <ButtonLink
        href={Routes.NewIntegrationPage()}
        variant="contained"
        color="primary"
        className={classes.createButton}
      >
        Create Integration
      </ButtonLink>

      <div>
        <JpSuspense name="IntegrationsList">
          <IntegrationsList />
        </JpSuspense>
      </div>
    </>
  )
}

IntegrationsPage.authenticate = true
IntegrationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default IntegrationsPage
