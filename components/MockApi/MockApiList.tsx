import {
  Box,
  Card,
  Divider,
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
import { DeleteMockApiModal } from "components";
import { useState } from "react";
import React from "react";

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
  hasPermission?: boolean;
}

export const MockApiList = ({ mockApis, hasPermission }: MockApiListProps) => {
  const [selectedApi, setSelectedApi] = useState<MockApi | null>(null);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  return (
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

        {mockApis?.length === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No API created yet
            </Typography>
          </Box>
        )}

        {mockApis?.map((api: MockApi) => (
          <React.Fragment key={api._id}>
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

                {hasPermission && (
                  <IconButton
                    onClick={async (e) => {
                      e.preventDefault();
                      setSelectedApi(api);
                    }}
                  >
                    <Tooltip title="Delete api" placement="top">
                      <HighlightOffIcon color="error" />
                    </Tooltip>
                  </IconButton>
                )}
              </ListItemButton>

              <Divider />
            </Link>

            {hasPermission && (
              <DeleteMockApiModal
                apiName={api.name}
                open={selectedApi?._id === api._id}
                handleClose={() => setSelectedApi(null)}
                action={async () => {
                  await deleteApi(api._id);
                  await mutate(`/api/project/${router.query.projectId}`);
                  setSelectedApi(null);
                }}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};
