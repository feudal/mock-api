import { Grid } from "@mui/material";
import { Breadcrumbs, CustomHead, ProjectForm, ProjectList } from "components";

export default function ProjectsPage() {
  return (
    <>
      <CustomHead title="Projects" />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>

        <Grid item xs={3}>
          <ProjectList />
        </Grid>

        <Grid item xs={9}>
          <ProjectForm />
        </Grid>
      </Grid>
    </>
  );
}
