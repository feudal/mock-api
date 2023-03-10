import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import { InterfaceSelector, MockApiData } from "components";
import { ProjectContext } from "context";

const generateMockApiData = async (
  url: string,
  {
    arg: { projectId, interfaceId, count },
  }: { arg: { projectId: string; interfaceId: string; count: number } }
) => await axios.post(url, { projectId, interfaceId, count });

export const MockApiDataGenerator = () => {
  const { mockApi } = useContext(ProjectContext);
  const { query } = useRouter();
  const { register, handleSubmit } = useForm();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/data/generate/${mockApi?.name}`,
    generateMockApiData,
    {
      onSuccess: () =>
        mutate(`/api/project/${query.projectId}?populateFields=true`),
    }
  );

  return (
    <Card>
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h5">Mock API - {mockApi?.name}</Typography>
      </CardContent>

      <Divider />

      <CardContent sx={{ p: 1 }}>
        <InterfaceSelector />
      </CardContent>

      <Divider />

      <CardContent sx={{ p: 1 }}>
        {mockApi?.data?.length !== 0 ? (
          <MockApiData />
        ) : (
          <form>
            <TextField
              fullWidth
              size="small"
              label="How many objects to generate (max 100)"
              type="number"
              defaultValue={10}
              inputProps={{ min: 1, max: 100 }}
              required
              {...register("count", {
                required: true,
                validate: (v) => v > 0 && v <= 100,
              })}
            />

            <LoadingButton
              variant="contained"
              sx={{ mt: 2, paddingInline: 5 }}
              onClick={handleSubmit((data) =>
                trigger({
                  projectId: query.projectId as string,
                  interfaceId: query.interfaceId as string,
                  count: data.count,
                })
              )}
              loading={isMutating}
              disabled={!query.interfaceId}
            >
              Generate objects for api
            </LoadingButton>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
