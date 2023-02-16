import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { MockApi } from "types";
import { getError, kebabCase } from "utils";
import { InterfaceInput } from "components";

export const MockApiForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  const createApi = (api: Partial<MockApi>) =>
    fetch(`/api/mock-api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(api),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
      })
      .then(() => router.reload())
      .catch((err) => toast.error(getError(err)));

  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          Create new API
        </Typography>
      </CardContent>

      <Divider />

      <form
        onSubmit={handleSubmit((data) => {
          data.name = kebabCase(data.name);
          data.fields = data.fields.filter((field: any) => field !== undefined);
          createApi(data);
        })}
      >
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="API name"
            required
            {...register("name", { required: true })}
          />

          <InterfaceInput register={register} setValue={setValue} />
        </CardContent>

        <Divider />

        <CardActions>
          <Button type="submit" variant="contained" sx={{ paddingInline: 10 }}>
            Create
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
