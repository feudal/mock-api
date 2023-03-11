import { Grid } from "@mui/material";
import { useContext } from "react";
import { useRouter } from "next/router";

import {
  Breadcrumbs,
  CustomHead,
  InterfaceForm,
  InterfaceList,
  MockApiList,
  ShowInterface,
  StateCard,
} from "components";
import { ProjectContext } from "context";
import { Stack } from "@mui/system";

export default function MockApiPage() {
  const { query } = useRouter();
  const { isLoading, isError, project, interFaces } =
    useContext(ProjectContext);
  const interFace = interFaces?.find(
    (interFace) => interFace._id === query.interfaceId
  );

  if (isLoading || isError)
    return <StateCard isError={isError} isLoading={isLoading} />;

  return (
    <>
      <CustomHead title={`Interface - ${project?.name}`} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>

        <Grid item xs={3}>
          <Stack spacing={2}>
            <InterfaceList />
            <MockApiList />
          </Stack>
        </Grid>

        <Grid item xs={9}>
          <Stack spacing={2}>
            <ShowInterface interFace={interFace} card />

            <InterfaceForm />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
