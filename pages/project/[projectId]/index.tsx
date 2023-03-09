import { Grid, Stack } from "@mui/material";
import { useContext } from "react";

import {
  CustomHead,
  Loader,
  InterfaceForm,
  MockApiList,
  Breadcrumbs,
  UserList,
  InterfaceList,
} from "components";
import { ProjectContext } from "context";

export default function MockApiPage() {
  const { project, hasPermission, isLoading } = useContext(ProjectContext);

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title={`Project - ${project?.name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>

        {hasPermission ? (
          <>
            <Grid item xs={3}>
              <Stack direction="column" spacing={2}>
                <MockApiList />
                <UserList />
                <InterfaceList />
              </Stack>
            </Grid>

            <Grid item xs={9}>
              <InterfaceForm />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6}>
              <MockApiList />
            </Grid>

            <Grid item xs={6}>
              <UserList />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
