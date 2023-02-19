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
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Project, User } from "types";
import { AutoCompleteMultiSelector } from "components";

export const ProjectForm = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const { data: users } = useSWR("/api/user", fetcher, {
    onError: (err: AxiosError) => toast.error(err.message),
  });

  const createProject = (project: Partial<Project>) =>
    axios
      .post("/api/project", project)
      .then(() => router.reload())
      .catch((err) => toast.error(err.response.data.error));

  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          Create new Project
        </Typography>
      </CardContent>

      <Divider />

      <form onSubmit={handleSubmit((data) => createProject(data))}>
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
              {...register("emails")}
              label="Emails"
              placeholder="Enter email"
              helperText="Enter email of users that will have access to this project"
              options={users?.data.map((user: User) => user.email)}
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
