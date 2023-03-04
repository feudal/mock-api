import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { MockApiData, MockApiInterface, StateCard } from "components";

const generateMockApiData = async (
  url: string,
  { arg: count }: { arg: string }
) => await axios.post(url, { count });

export const MockApi = () => {
  const { query } = useRouter();
  const { register, handleSubmit } = useForm();

  const {
    data: api,
    error: isError,
    isLoading,
    mutate,
  } = useSWR(`/api/mock-api/${query.id}`);
  const { name, fields, data } = api?.data || {};

  const { trigger, isMutating } = useSWRMutation(
    `/api/data/generate/${name}`,
    generateMockApiData,
    { onSuccess: () => mutate(`/api/mock-api/${query.id}`) }
  );

  if (isLoading || isError) {
    return <StateCard isLoading={isLoading} isError={isError} />;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Mock API - {name}</Typography>
      </CardContent>

      <Divider />

      <CardContent>
        <MockApiInterface name={name} fields={fields} />
      </CardContent>

      <Divider />

      <CardContent>
        {data?.length !== 0 ? (
          <MockApiData apiName={name} data={data} />
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
              loadingPosition="start"
            >
              Generate objects for api
            </LoadingButton>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
