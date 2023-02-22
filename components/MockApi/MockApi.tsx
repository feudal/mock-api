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

import { MockApiData, MockApiInterface } from "components";

const generateMockApi = async (name: string, count: number) => {
  await axios
    .post(`/api/data/generate/${name}`, { count })
    .catch((err) => toast.error(err.response.data.error));
};

export const MockApi = () => {
  const { query } = useRouter();
  const { register, handleSubmit } = useForm();

  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const {
    data: api,
    error: isError,
    isLoading,
    mutate,
  } = useSWR(`/api/mock-api/${query.id}`, fetcher);

  const { name, fields, data } = api?.data || {};

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

                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleSubmit(async (data) => {
                    await generateMockApi(name, data.count);
                    mutate(`/api/mock-api/${query.id}`);
                  })}
                >
                  Generate objects for api
                </Button>
              </form>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};
