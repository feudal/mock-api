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
import useSWRMutation from "swr/mutation";

import { AddUserToProject, DeleteUserAccessModal } from "components";
import { User } from "types";
import { useRouter } from "next/router";

const list_style = {
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 1,
  overflow: "hidden",
};

interface UserListProps {
  users: User[];
  hasPermission?: boolean;
}

const removeUserFromList = async (url: string) => await axios.patch(url);

export const UserList = ({ users, hasPermission }: UserListProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const { data: allUsers } = useSWR("/api/user");
  const availableUsers = allUsers?.data?.filter(
    (user: User) => !users?.some((u) => u._id === user._id)
  );

  const url = `/api/project/${router.query.projectId}`;
  const { trigger, isMutating } = useSWRMutation(
    url,
    () => removeUserFromList(`${url}/users/${selectedUser?._id}`),
    {
      onSuccess: () => {
        mutate(url);
        setSelectedUser(null);
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return (
    <Card>
      <List
        sx={list_style}
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
                action={trigger}
                isLoading={isMutating}
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
