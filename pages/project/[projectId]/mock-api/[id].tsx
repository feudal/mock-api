import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { toast } from "react-toastify";

import { CustomHead, Loader, MockApi, PageTitle } from "components";

export default function MockApiPage() {
  const { query } = useRouter();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/project/${query.projectId}`,
    fetcher
  );

  if (error) toast.error(error.response.data.error);
  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title={`Project - ${query.id}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageTitle entity="Api" name={data?.name} />
        </Grid>

        <Grid item xs={12}>
          <MockApi />
        </Grid>
      </Grid>
    </>
  );
}
