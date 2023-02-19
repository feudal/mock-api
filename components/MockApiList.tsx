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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { MockApi } from "types";

const LIST_STYLE = {
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 1,
  overflow: "hidden",
};

const deleteApi = async (id: string) => {
  await axios
    .delete(`/api/mock-api/${id}`)
    .catch((err) => toast.error(err.response.data.error));
};

export const MockApiList = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClick = () => setOpen(!open);

  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const {
    data: apis,
    error: isError,
    isLoading,
    mutate,
  } = useSWR("/api/mock-api", fetcher);

  // TODO: move this to a separate component
  const state = (isLoading || isError || apis?.data?.length === 0) && (
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
          sx={LIST_STYLE}
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

          {apis?.data?.map((api: MockApi) => (
            <Link href={`/${api._id}`} key={api._id} passHref>
              <ListItemButton>
                <ListItemText
                  sx={{ fontStyle: "italic" }}
                  primary={`/${api.name}`}
                />

                <IconButton
                  onClick={async (e) => {
                    e.preventDefault();
                    await deleteApi(api._id);
                    await mutate("/api/mock-api");
                    if (router.asPath === `/${api._id}`) router.push("/apis");
                  }}
                >
                  <Tooltip title="Delete api" placement="top">
                    <HighlightOffIcon color="error" />
                  </Tooltip>
                </IconButton>
              </ListItemButton>

              <Divider />
            </Link>
          ))}
        </List>

        <CardActions>
          {router.asPath !== "/apis" && !isLoading && (
            <Button fullWidth variant="contained">
              <Link href="/apis">Create new API</Link>
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
