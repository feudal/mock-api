import {
  Card,
  List,
  ListSubheader,
  Divider,
  ListItemText,
  IconButton,
  Tooltip,
  ListItemButton,
  Typography,
  Box,
  ListItem,
  Stack,
  Button,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

import { DeleteUserAccessModal } from "components";
import { User } from "types";
import { useRouter } from "next/router";
import { AddUserToProject } from "./Modals/AddUserToProjectModal";

const LIST_STYLE = {
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 1,
  overflow: "hidden",
};

interface UserListProps {
  users: User[];
}

const removeUserFromList = async (projectId: string, userId: string) => {
  await axios
    .patch(`/api/project/${projectId}/users/${userId}`)
    .catch((err) => toast.error(err.response.data.error));
};

export const UserList = ({ users }: UserListProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  return (
    <Card>
      <List
        sx={LIST_STYLE}
        component="nav"
        subheader={
          <ListSubheader component="div">Users in project</ListSubheader>
        }
      >
        <Divider />
        {users?.length === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No users
            </Typography>
          </Box>
        )}

        {users?.map((user: User) => (
          <React.Fragment key={user._id}>
            <ListItem>
              <ListItemText
                primary={
                  <Stack>
                    {user.name}
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Stack>
                }
              />

              <IconButton onClick={() => setSelectedUser(user)}>
                <Tooltip title="Delete user from list" placement="top">
                  <HighlightOffIcon color="error" />
                </Tooltip>
              </IconButton>
            </ListItem>

            <Divider />

            <DeleteUserAccessModal
              userName={user.name}
              open={selectedUser?._id === user._id}
              handleClose={() => setSelectedUser(null)}
              action={async () => {
                await removeUserFromList(
                  router.query.projectId as string,
                  user._id
                );
                mutate(`/api/project/${router.query.projectId}`);
                setSelectedUser(null);
              }}
            />
          </React.Fragment>
        ))}

        <ListItem>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setAddUserModalOpen(true)}
          >
            Add user
          </Button>

          <AddUserToProject
            open={addUserModalOpen}
            handleClose={() => setAddUserModalOpen(false)}
          />
        </ListItem>
      </List>
    </Card>
  );
};
