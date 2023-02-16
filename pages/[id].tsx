import { useRouter } from "next/router";
import { CustomHead, MockApi, MockApiList } from "components";
import { Grid } from "@mui/material";

export default function Home() {
  const { id } = useRouter().query;

  return (
    <>
      <CustomHead title={`Mock API - ${id}`} />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MockApiList />
        </Grid>
        <Grid item xs={9}>
          <MockApi />
        </Grid>
      </Grid>
    </>
  );
}
