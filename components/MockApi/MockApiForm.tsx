import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { Field, MockApi } from "types";
import { kebabCase } from "utils";
import { InterfaceInput } from "components";

const createApi = async (url: string, { arg }: { arg: Partial<MockApi> }) =>
  await axios.patch(url, arg);

export const MockApiForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { mutate } = useSWRConfig();
  const { query } = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    `/api/project/${query.projectId}`,
    createApi,
    {
      onSuccess: async () =>
        (await mutate(`/api/project/${query.projectId}`)) && reset(),
    }
  );

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
          data.fields = data.fields?.filter((f: Field) => f !== undefined);
          trigger(data);
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
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ paddingInline: 10 }}
            loading={isMutating}
            loadingPosition="start"
          >
            Create
          </LoadingButton>
        </CardActions>
      </form>
    </Card>
  );
};
