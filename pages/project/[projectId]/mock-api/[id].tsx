import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

import {
  Breadcrumbs,
  CustomHead,
  InterfaceList,
  MockApi,
  StateCard,
} from "components";
import { MockApi as MockApiType } from "types";

export default function MockApiPage() {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(`/api/project/${query.projectId}`);

  const interfaces = data?.data?.interfaces;
  const projectName = data?.data?.name;
  const mockApi = data?.data?.mockApis?.find(
    (mockApi: MockApiType) => mockApi._id === query.id
  );

  if (error || error)
    return <StateCard isError={error} isLoading={isLoading} />;

  return (
    <>
      <CustomHead title={`Mock API - ${projectName}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs projectName={projectName} mockApiName={mockApi?.name} />
        </Grid>

        <Grid item xs={3}>
          <InterfaceList interfaces={interfaces} />
        </Grid>

        <Grid item xs={9}>
          <MockApi mockApi={mockApi} interfaces={interfaces} />
        </Grid>
      </Grid>
    </>
  );
}
