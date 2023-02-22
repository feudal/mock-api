import {
  Card,
  List,
  ListSubheader,
  Divider,
  ListItemText,
  IconButton,
  Tooltip,
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
import useSWR, { useSWRConfig } from "swr";

import { AddUserToProject, DeleteUserAccessModal } from "components";
import { User } from "types";
import { useRouter } from "next/router";

const LIST_STYLE = {
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 1,
  overflow: "hidden",
};

interface UserListProps {
  users: User[];
  hasPermission?: boolean;
}

const removeUserFromList = async (projectId: string, userId: string) => {
  await axios
    .patch(`/api/project/${projectId}/users/${userId}`)
    .catch((err) => toast.error(err.response.data.error));
};

export const UserList = ({ users, hasPermission }: UserListProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const fetcher = async (url: string) => fetch(url).then((r) => r.json());
  const { data: allUsers } = useSWR("/api/user", fetcher);

  const availableUsers = allUsers?.data?.filter(
    (user: User) => !users?.some((u) => u._id === user._id)
  );

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

              {hasPermission && (
                <IconButton onClick={() => setSelectedUser(user)}>
                  <Tooltip title="Delete user from list" placement="top">
                    <HighlightOffIcon color="error" />
                  </Tooltip>
                </IconButton>
              )}
            </ListItem>

            <Divider />

            {hasPermission && (
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
            )}
          </React.Fragment>
        ))}

        {hasPermission && availableUsers?.length > 0 && (
          <ListItem>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setAddUserModalOpen(true)}
            >
              Add users
            </Button>

            <AddUserToProject
              open={addUserModalOpen}
              handleClose={() => setAddUserModalOpen(false)}
              users={availableUsers}
            />
          </ListItem>
        )}
      </List>
    </Card>
  );
};
