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

import { Field, Interface } from "types";
import { kebabCase } from "utils";
import { InterfaceInput } from "components";

const createInterface = async (
  url: string,
  { arg }: { arg: Partial<Interface> & { projectId: string } }
) => await axios.post(url, arg);

interface InterfaceFormProps {
  interfaces?: Interface[];
}

export const InterfaceForm = ({ interfaces }: InterfaceFormProps) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { mutate } = useSWRConfig();
  const { query } = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    "/api/interface",
    createInterface,
    {
      onSuccess: async () =>
        (await mutate(`/api/project/${query.projectId}`)) && reset(),
    }
  );

  return (
    <Card>
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="h5">Create new Interface</Typography>
      </CardContent>

      <Divider />

      <form
        onSubmit={handleSubmit((data) => {
          data.name = kebabCase(data.name);
          data.fields = data.fields?.filter((f: Field) => f !== undefined);
          trigger({
            ...data,
            projectId: query.projectId as string,
          });
        })}
      >
        <CardContent sx={{ padding: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Interface name"
            required
            {...register("name", { required: true })}
          />

          <InterfaceInput
            register={register}
            setValue={setValue}
            interfaces={interfaces}
          />
        </CardContent>

        <Divider />

        <CardActions>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ paddingInline: 10 }}
            loading={isMutating}
          >
            Create
          </LoadingButton>
        </CardActions>
      </form>
    </Card>
  );
};
