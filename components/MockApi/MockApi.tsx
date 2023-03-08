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

import { Interface, MockApiData, StateCard } from "components";
import { MockApi as MockApiType, Interface as InterfaceType } from "types";

const generateMockApiData = async (
  url: string,
  { arg: count }: { arg: string }
) => await axios.post(url, { count });

interface MockApiProps {
  mockApi: MockApiType;
  interfaces: InterfaceType[];
}

export const MockApi = ({ mockApi, interfaces }: MockApiProps) => {
  const { query } = useRouter();
  const { register, handleSubmit } = useForm();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/data/generate/${mockApi?.name}`,
    generateMockApiData,
    { onSuccess: () => mutate(`/api/mock-api/${query.id}`) }
  );

  return (
    <Card>
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="h5">Mock API - {mockApi?.name}</Typography>
      </CardContent>

      <Divider />

      <CardContent sx={{ padding: 1 }}>
        <Interface name={mockApi?.name} interFaces={interfaces} />
      </CardContent>

      <Divider />

      <CardContent sx={{ padding: 1 }}>
        {mockApi?.data?.length !== 0 ? (
          <MockApiData apiName={mockApi?.name} data={mockApi?.data} />
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
              onClick={handleSubmit((data) => trigger(data.count))}
              loading={isMutating}
            >
              Generate objects for api
            </LoadingButton>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
