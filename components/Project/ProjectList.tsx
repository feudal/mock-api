import {
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import FolderIcon from "@mui/icons-material/Folder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { Project } from "types";
import { DeleteProjectModal } from "components";

const deleteProject = async (id: string) => {
  await axios
    .delete(`/api/project/${id}`)
    .catch((err) => toast.error(err.response.data.error));
};

export const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const {
    data: projects,
    error: isError,
    isLoading,
    mutate,
  } = useSWR("/api/project", fetcher);

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
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 1,
          overflow: "hidden",
        }}
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
                      <FolderIcon />
                      <span>{project.name}</span>
                    </Stack>
                  }
                />

                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProject(project);
                  }}
                >
                  <Tooltip title="Delete project" placement="top">
                    <HighlightOffIcon color="error" />
                  </Tooltip>
                </IconButton>
              </ListItemButton>

              <Divider />
            </Link>

            <DeleteProjectModal
              projectName={project.name}
              open={selectedProject?._id === project._id}
              handleClose={() => setSelectedProject(null)}
              action={async () => {
                await deleteProject(project._id);
                mutate("/api/project");
                setSelectedProject(null);
              }}
            />
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};
