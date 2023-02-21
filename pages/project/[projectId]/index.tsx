import { useRouter } from "next/router";
import { Grid, Stack } from "@mui/material";
import useSWR from "swr";
import { toast } from "react-toastify";

import {
  CustomHead,
  Loader,
  MockApiForm,
  MockApiList,
  PageTitle,
  UserList,
} from "components";

export default function MockApiPage() {
  const { query } = useRouter();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `/api/project/${query.projectId}`,
    fetcher,
    { onError: (err) => toast.error(err.message) }
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title={`Project - ${data?.name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageTitle entity="Project" name={data?.name} />
        </Grid>

        <Grid item xs={3}>
          <Stack direction="column" spacing={2}>
            <MockApiList mockApis={data?.mockApis} />

            <UserList users={data?.users} />
          </Stack>
        </Grid>

        <Grid item xs={9}>
          <MockApiForm />
        </Grid>
      </Grid>
    </>
  );
}
