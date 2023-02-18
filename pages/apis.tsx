import { Grid } from "@mui/material";
import { CustomHead, MockApiForm, MockApiList } from "components";

export default function MockApisPage() {
  return (
    <>
      <CustomHead title="Mocks APIs" />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MockApiList />
        </Grid>
        <Grid item xs={9}>
          <MockApiForm />
        </Grid>
      </Grid>
    </>
  );
}
