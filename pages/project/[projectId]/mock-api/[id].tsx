import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

import {
  Breadcrumbs,
  CustomHead,
  InterfaceList,
  MockApiDataGenerator,
  StateCard,
} from "components";
import { MockApi } from "types";

export default function MockApiPage() {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    `/api/project/${query.projectId}?populateFields=true`
  );

  const interfaces = data?.data?.interfaces;
  const project = data?.data;
  const mockApi = data?.data?.mockApis?.find(
    (mockApi: MockApi) => mockApi._id === query.id
  );

  if (error || error)
    return <StateCard isError={error} isLoading={isLoading} />;

  return (
    <>
      <CustomHead title={`Mock API - ${project?.name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs
            projectName={project?.name}
            mockApiName={mockApi?.name}
          />
        </Grid>

        <Grid item xs={3}>
          <InterfaceList interfaces={interfaces} />
        </Grid>

        <Grid item xs={9}>
          <MockApiDataGenerator project={project} />
        </Grid>
      </Grid>
    </>
  );
}
