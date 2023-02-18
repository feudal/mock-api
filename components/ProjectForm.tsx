import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { Project, User } from "types";
import { getError } from "utils";
import { AutoCompleteMultiSelector } from "components";

export const ProjectForm = () => {
  const { register, handleSubmit } = useForm();
  const [users, setUser] = useState<{ data: User[] } | null>(null);
  const router = useRouter();

  const fetchUsers = async () => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => toast.error(getError(err)));
  };

  const createProject = (project: Partial<Project>) =>
    fetch(`/api/project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
      })
      .then(() => router.reload())
      .catch((err) => toast.error(getError(err)));

  useEffect(() => {
    fetchUsers();
  }, []);

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
              options={users?.data.map((user) => user.email)}
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
