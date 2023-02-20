import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import useSWR from "swr";
import { toast } from "react-toastify";

import {
  CustomHead,
  Loader,
  MockApiForm,
  MockApiList,
  PageTitle,
} from "components";

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
      <CustomHead title={`Project - ${data?.name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageTitle entity="Project" name={data?.name} />
        </Grid>

        <Grid item xs={3}>
          <MockApiList mockApis={data?.mockApis} />
        </Grid>

        <Grid item xs={9}>
          <MockApiForm />
        </Grid>
      </Grid>
    </>
  );
}
