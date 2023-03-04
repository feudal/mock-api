import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import { Project, User } from "types";
import { AutoCompleteMultiSelector } from "components";

const createProject = async (url: string, { arg }: { arg: Partial<Project> }) =>
  await axios.post(url, arg);

export const ProjectForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const { data: users } = useSWR("/api/user");

  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    "/api/project",
    createProject,
    { onSuccess: async () => (await mutate("/api/project")) && reset() }
  );

  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          Create new Project
        </Typography>
      </CardContent>

      <Divider />

      <form onSubmit={handleSubmit((data) => trigger(data))}>
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Project name"
            required
            {...register("name", { required: true })}
          />

          <Box sx={{ mt: 1 }}>
            <AutoCompleteMultiSelector
              label="Emails"
              placeholder="Enter email"
              helperText="Enter email of users that will have access to this project"
              options={users?.data?.map((user: User) => user.email)}
              {...register("emails")}
            />
          </Box>
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
