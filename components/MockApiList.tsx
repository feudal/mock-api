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
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

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

interface MockApiListProps {
  mockApis: MockApi[];
}

export const MockApiList = ({ mockApis }: MockApiListProps) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

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

          {mockApis?.map((api: MockApi) => (
            <Link
              href={`/project/${router.query.projectId}/mock-api/${api._id}`}
              key={api._id}
              passHref
            >
              <ListItemButton>
                <ListItemText
                  sx={{ fontStyle: "italic" }}
                  primary={`/${api.name}`}
                />

                <IconButton
                  onClick={async (e) => {
                    e.preventDefault();
                    await deleteApi(api._id);
                    await mutate(`/api/project/${router.query.projectId}`);
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
          <Button fullWidth variant="contained">
            Create new API
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
