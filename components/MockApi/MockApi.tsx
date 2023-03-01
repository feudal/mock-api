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
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { MockApiData, MockApiInterface } from "components";

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
    {
      onSuccess: () => mutate(`/api/mock-api/${query.id}`),
      onError: (err) => toast.error(err.message),
    }
  );

  // TODO: Move this to a separate component
  const dataState = (isLoading || isError) && (
    <Grid
      alignContent="center"
      justifyContent="center"
      container
      height="50vh"
      minHeight={200}
    >
      {isLoading && <CircularProgress size={100} />}
      {isError && (
        <Typography align="center" variant="h2" color="error">
          Error
        </Typography>
      )}
    </Grid>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Mock API - {name}</Typography>
      </CardContent>

      <Divider />

      {dataState || (
        <>
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
        </>
      )}
    </Card>
  );
};
