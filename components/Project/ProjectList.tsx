import {
  Card,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import FolderIcon from "@mui/icons-material/Folder";
import axios from "axios";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { Project } from "types";
import { DeleteButton, DeleteProjectModal } from "components";

const list_style = {
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 1,
  overflow: "hidden",
};

const deleteProject = async (url: string) => await axios.delete(url);

export const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const {
    data: projects,
    error: isError,
    isLoading,
    mutate,
  } = useSWR("/api/project");

  const { trigger, isMutating } = useSWRMutation(
    "/api/project",
    () => deleteProject(`/api/project/${selectedProject?._id}`),
    {
      onSuccess: async () => {
        mutate("/api/project");
        setSelectedProject(null);
      },
      onError: (err) => toast.error(err.message),
    }
  );

  // TODO: move this to a separate component
  const state = (isLoading || isError || projects?.data?.length === 0) && (
    <Grid
      alignContent="center"
      justifyContent="center"
      container
      height="50vh"
      minHeight={200}
    >
      {isLoading && <CircularProgress size={100} />}
      {isError && (
        <Typography align="center" variant="h4" color="error">
          Error
        </Typography>
      )}
      {projects?.data?.length === 0 && (
        <Typography variant="h4" align="center">
          No projects <br /> found
        </Typography>
      )}
    </Grid>
  );

  return (
    <Card>
      <List
        sx={list_style}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Project list
          </ListSubheader>
        }
      >
        <Divider />

        {state}

        {projects?.data?.map((project: Project) => (
          <React.Fragment key={project._id}>
            <Link href={`/project/${project._id}`} key={project._id} passHref>
              <ListItemButton>
                <ListItemText
                  sx={{ fontStyle: "italic" }}
                  primary={
                    <Stack direction="row" spacing={1}>
                      <FolderIcon color="secondary" />
                      <span>{project.name}</span>
                    </Stack>
                  }
                />
                {project.hasPermission && (
                  <DeleteButton
                    title="Delete project"
                    onClick={(e: SyntheticEvent) => {
                      e.preventDefault();
                      setSelectedProject(project);
                    }}
                  />
                )}
              </ListItemButton>

              <Divider />
            </Link>

            <DeleteProjectModal
              projectName={project.name}
              open={selectedProject?._id === project._id}
              handleClose={() => setSelectedProject(null)}
              action={trigger}
              isLoading={isMutating}
            />
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};
