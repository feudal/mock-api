import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { toast } from "react-toastify";

import { Breadcrumbs, CustomHead, Loader, MockApi } from "components";
import { MockApi as MockApiType } from "types";

export default function MockApiPage() {
  const { query } = useRouter();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/project/${query.projectId}`,
    fetcher
  );

  const projectName = data?.data?.name;
  const mockApiName = data?.data?.mockApis?.find(
    (mockApi: MockApiType) => mockApi._id === query.id
  )?.name;

  if (error) toast.error(error.message);
  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title={`Project - ${projectName}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs projectName={projectName} mockApiName={mockApiName} />
        </Grid>

        <Grid item xs={12}>
          <MockApi />
        </Grid>
      </Grid>
    </>
  );
}
