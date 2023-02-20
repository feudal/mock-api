import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import useSWR from "swr";
import { toast } from "react-toastify";

import { CustomHead, Loader, MockApiData, PageTitle } from "components";
import { MockApi } from "types";

export default function MockApiPage() {
  const { query } = useRouter();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/project/${query.projectId}`,
    fetcher
  );

  const mockApi = data?.mockApis.find(
    (mockApi: MockApi) => mockApi._id === query.id
  );

  if (error) toast.error(error.response.data.error);
  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title={`Project - ${query.id}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageTitle entity="Api" name={mockApi?.name} />
        </Grid>

        <Grid item xs={12}>
          <MockApiData data={mockApi._id} />
        </Grid>
      </Grid>
    </>
  );
}
