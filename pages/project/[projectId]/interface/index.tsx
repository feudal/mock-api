import { Grid, Stack } from "@mui/material";
import { useContext } from "react";

import {
  Breadcrumbs,
  CustomHead,
  InterfaceForm,
  InterfaceList,
  MockApiList,
  StateCard,
} from "components";
import { ProjectContext } from "context";

export default function MockApiPage() {
  const { isLoading, isError, project } = useContext(ProjectContext);

  if (isLoading || isError)
    return <StateCard isError={isError} isLoading={isLoading} />;

  return (
    <>
      <CustomHead title={`Interface - ${project?.name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>

        <Grid item xs={3}>
          <Stack spacing={2}>
            <InterfaceList />
            <MockApiList />
          </Stack>
        </Grid>

        <Grid item xs={9}>
          <InterfaceForm />
        </Grid>
      </Grid>
    </>
  );
}
