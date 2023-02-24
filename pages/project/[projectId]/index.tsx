import { useRouter } from "next/router";
import { Grid, Stack } from "@mui/material";
import useSWR from "swr";
import { toast } from "react-toastify";

import {
  CustomHead,
  Loader,
  MockApiForm,
  MockApiList,
  Breadcrumbs,
  UserList,
} from "components";

export default function MockApiPage() {
  const { query } = useRouter();

  const { data, isLoading } = useSWR(`/api/project/${query.projectId}`, {
    onError: (err) => toast.error(err.message),
  });
  const {
    hasPermission,
    data: { mockApis, name, users },
  } = data || { hasPermission: false, data: {} };

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title={`Project - ${name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs projectName={name} />
        </Grid>

        {hasPermission ? (
          <>
            <Grid item xs={3}>
              <Stack direction="column" spacing={2}>
                <MockApiList
                  mockApis={mockApis}
                  hasPermission={hasPermission}
                />

                <UserList users={users} hasPermission={hasPermission} />
              </Stack>
            </Grid>

            <Grid item xs={9}>
              <MockApiForm />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6}>
              <MockApiList mockApis={mockApis} />
            </Grid>

            <Grid item xs={6}>
              <UserList users={users} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
