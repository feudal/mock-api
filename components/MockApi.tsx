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
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { MockApi as MockApiType } from "types";
import { MockApiData, MockApiInterface } from "components";
import { getError } from "utils";

const generateMockApi = async (name: string, count: number) => {
  if (!name) return;

  fetch(`/api/mock-api/generate/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      toast.success("Data for API generated");
    })
    .catch((err) => toast.error(getError(err)));
};

export const MockApi = () => {
  const { id } = useRouter().query;
  const [api, setApi] = useState<MockApiType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit, getFieldState } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    fetch(`/api/mock-api/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: MockApiType) => {
        setApi(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        toast.error(getError(err));
      });
  }, [id]);

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
        <Typography variant="h4">Mock API - {api?.name}</Typography>
      </CardContent>

      <Divider />

      {dataState || (
        <>
          <CardContent>
            <MockApiInterface name={api?.name} fields={api?.fields} />
          </CardContent>

          <Divider />

          <CardContent>
            {api?.data.length !== 0 ? (
              <MockApiData apiName={api?.name} data={api?.data} />
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
                  error={!!getFieldState("count").invalid}
                  {...register("count", {
                    required: true,
                    validate: (v) => v > 0 && v <= 100,
                  })}
                />

                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleSubmit(async (data) => {
                    if (api?.name) {
                      await generateMockApi(api.name, data.count);
                      router.reload();
                    }
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
