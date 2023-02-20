import { Grid } from "@mui/material";
import { CustomHead, ProjectForm, ProjectList } from "components";

export default function ProjectsPage() {
  return (
    <>
      <CustomHead title="Projects" />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          {/*  
            TODO: FIX THIS
          */}
          <ProjectList />
        </Grid>
        <Grid item xs={9}>
          <ProjectForm />
        </Grid>
      </Grid>
    </>
  );
}
