import {
  Button,
  Card,
  CardActions,
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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { Project } from "types";

const deleteProject = async (id: string) => {
  await axios
    .delete(`/api/project/${id}`)
    .catch((err) => toast.error(err.response.data.error));
};

export const ProjectList = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClick = () => setOpen(!open);

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
    <>
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
            <Link href={`/${project._id}`} key={project._id} passHref>
              <ListItemButton>
                <ListItemText
                  sx={{ fontStyle: "italic" }}
                  primary={`/${project.name}`}
                />

                <IconButton
                  onClick={async (e) => {
                    e.preventDefault();
                    await deleteProject(project._id);
                    mutate("/api/project");
                  }}
                >
                  <Tooltip title="Delete project" placement="top">
                    <HighlightOffIcon color="error" />
                  </Tooltip>
                </IconButton>
              </ListItemButton>

              <Divider />
            </Link>
          ))}
        </List>

        <CardActions>
          {router.asPath !== "/" && !isLoading && (
            <Link href="/" passHref>
              <Button variant="contained" sx={{ width: "100%" }}>
                Create new project
              </Button>
            </Link>
          )}
        </CardActions>
      </Card>

      {/* <Card>
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
              Projects
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Your APIs" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Card> */}
    </>
  );
};
