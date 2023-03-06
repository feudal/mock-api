import { useRouter } from "next/router";
import { Grid, Stack } from "@mui/material";
import useSWR from "swr";

import {
  CustomHead,
  Loader,
  InterfaceForm,
  MockApiList,
  Breadcrumbs,
  UserList,
} from "components";
import { InterfaceList } from "components";
import { Project } from "types";

export default function MockApiPage() {
  const { query } = useRouter();

  const { data, isLoading } = useSWR<{
    hasPermission: boolean;
    data: Project;
  }>(`/api/project/${query.projectId}`);

  const { data: project, hasPermission } = data || {};

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title={`Project - ${project?.name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs projectName={project?.name} />
        </Grid>

        {hasPermission ? (
          <>
            <Grid item xs={3}>
              <Stack direction="column" spacing={2}>
                <MockApiList
                  mockApis={project?.mockApis}
                  hasPermission={hasPermission}
                />

                <UserList
                  users={project?.users}
                  hasPermission={hasPermission}
                />

                <InterfaceList
                  interfaces={project?.interfaces}
                  hasPermission={hasPermission}
                />
              </Stack>
            </Grid>

            <Grid item xs={9}>
              <InterfaceForm />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6}>
              <MockApiList mockApis={project?.mockApis} />
            </Grid>

            <Grid item xs={6}>
              <UserList users={project?.users} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
