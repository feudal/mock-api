import { Grid } from "@mui/material";
import { useContext } from "react";

import {
  CustomHead,
  Loader,
  MockApiList,
  Breadcrumbs,
  UserList,
  InterfaceList,
} from "components";
import { ProjectContext } from "context";

export default function MockApiPage() {
  const { project, isLoading } = useContext(ProjectContext);

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title={`Project - ${project?.name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>

        <Grid item xs={4}>
          <UserList />
        </Grid>

        <Grid item xs={4}>
          <MockApiList />
        </Grid>

        <Grid item xs={4}>
          <InterfaceList />
        </Grid>
      </Grid>
    </>
  );
}
