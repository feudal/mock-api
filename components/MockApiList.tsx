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

import { MockApi } from "types";
import { getError } from "utils";

export const MockApiList = () => {
  const [apis, setApis] = useState<{ data: MockApi[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClick = () => setOpen(!open);

  useEffect(() => {
    setIsLoading(true);

    fetch("/api/mock-api")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setApis(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        toast.error(getError(err));
      });
  }, []);

  const deleteApi = (id: string) =>
    fetch(`/api/mock-api/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(() => {
        setApis((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            data: prev?.data?.filter((api) => api._id !== id),
          };
        });
        router.push("/");
      })
      .catch((err) => toast.error(getError(err)));

  const state = (isLoading || isError) && (
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
      {apis?.data?.length === 0 && (
        <Typography variant="h4">No APIs</Typography>
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
              API list
            </ListSubheader>
          }
        >
          <Divider />

          {state}

          {apis?.data?.map((api) => (
            <>
              <ListItemButton key={api._id} href={`/${api._id}`}>
                <ListItemText
                  sx={{ fontStyle: "italic" }}
                  primary={`/${api.name}`}
                />

                <IconButton onClick={() => deleteApi(api._id)}>
                  <Tooltip title="Delete api" placement="top">
                    <HighlightOffIcon color="error" />
                  </Tooltip>
                </IconButton>
              </ListItemButton>

              <Divider />
            </>
          ))}
        </List>

        <CardActions>
          {router.asPath !== "/" && !isLoading && (
            <Button variant="contained" sx={{ width: "100%" }}>
              <Link href="/">Create new API</Link>
            </Button>
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
