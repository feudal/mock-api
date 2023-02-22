import {
  Box,
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
import useSWR, { useSWRConfig } from "swr";

import { Project, User } from "types";
import { AutoCompleteMultiSelector } from "components";

const createProject = async (project: Partial<Project>) => {
  let error = false;
  await axios.post("/api/project", project).catch((err) => {
    error = true;
    toast.error(err.response.data.error);
  });
  return error;
};

export const ProjectForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: users } = useSWR("/api/user", fetcher, {
    onError: (err) => toast.error(err.message),
  });

  const { mutate } = useSWRConfig();

  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          Create new Project
        </Typography>
      </CardContent>

      <Divider />

      <form
        onSubmit={handleSubmit(async (data) => {
          const error = await createProject(data);
          mutate("/api/project");
          if (!error) reset();
        })}
      >
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
          <Button type="submit" variant="contained" sx={{ paddingInline: 10 }}>
            Create
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
