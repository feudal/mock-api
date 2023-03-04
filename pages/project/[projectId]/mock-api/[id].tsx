import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

import {
  Breadcrumbs,
  CustomHead,
  Loader,
  MockApi,
  StateCard,
} from "components";
import { MockApi as MockApiType } from "types";

export default function MockApiPage() {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(`/api/project/${query.projectId}`);

  const projectName = data?.data?.name;
  const mockApiName = data?.data?.mockApis?.find(
    (mockApi: MockApiType) => mockApi._id === query.id
  )?.name;

  if (error || error)
    return <StateCard isError={error} isLoading={isLoading} />;

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
