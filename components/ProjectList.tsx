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
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Project } from "types";
import { getError } from "utils";

export const ProjectList = () => {
  const [projects, setProjects] = useState<{ data: Project[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClick = () => setOpen(!open);

  useEffect(() => {
    setIsLoading(true);

    fetch("/api/project")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        toast.error(getError(err));
      });
  }, []);

  const deleteProject = (id: string) =>
    fetch(`/api/project/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(() => {
        setProjects((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            data: prev?.data?.filter((project) => project._id !== id),
          };
        });
        router.push("/");
      })
      .catch((err) => toast.error(getError(err)));

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
        <Typography variant="h4">No Project</Typography>
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

          {projects?.data?.map((project) => (
            <Link href={`/${project._id}`} key={project._id} passHref>
              <ListItemButton>
                <ListItemText
                  sx={{ fontStyle: "italic" }}
                  primary={`/${project.name}`}
                />

                <IconButton onClick={() => deleteProject(project._id)}>
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
