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
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import { InterfaceSelector, MockApiData } from "components";
import { MockApi, Project } from "types";

const generateMockApiData = async (
  url: string,
  {
    arg: { count, interfaceId },
  }: { arg: { count: number; interfaceId: string } }
) => await axios.post(url, { count, interfaceId });

interface MockApiDataGeneratorProps {
  project: Project;
}

export const MockApiDataGenerator = ({
  project,
}: MockApiDataGeneratorProps) => {
  const { query } = useRouter();
  const { register, handleSubmit } = useForm();
  const { mutate } = useSWRConfig();

  const interFaces = project?.interfaces;
  const mockApi = project?.mockApis?.find(
    (mockApi: MockApi) => mockApi._id === query.id
  );

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
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="h5">Mock API - {mockApi?.name}</Typography>
      </CardContent>

      <Divider />

      <CardContent sx={{ padding: 1 }}>
        <InterfaceSelector
          interFaces={interFaces}
          selectedInterFace={mockApi?.interface}
        />
      </CardContent>

      <Divider />

      <CardContent sx={{ padding: 1 }}>
        {mockApi?.data?.length !== 0 ? (
          <MockApiData data={mockApi?.data} apiName={mockApi?.name} />
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
                  count: data.count,
                  interfaceId: query.interfaceId as string,
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
