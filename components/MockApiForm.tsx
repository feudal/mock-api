import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

import { Field, MockApi } from "types";
import { kebabCase } from "utils";
import { InterfaceInput } from "components";

export const MockApiForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { mutate } = useSWRConfig();

  const createApi = async (api: Partial<MockApi>) => {
    let error = false;
    await axios.post("/api/mock-api", api).catch((err) => {
      toast.error(err.response.data.error);
      error = true;
    });
    return error;
  };

  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          Create new API
        </Typography>
      </CardContent>

      <Divider />

      <form
        onSubmit={handleSubmit(async (data) => {
          data.name = kebabCase(data.name);
          data.fields = data.fields.filter(
            (field: Field) => field !== undefined
          );
          const error = await createApi(data);
          mutate("/api/mock-api");
          if (!error) reset();
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
