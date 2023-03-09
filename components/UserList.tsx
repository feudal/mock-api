import { Card, Button, CardActions } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import {
  AddUserToProject,
  DeleteButton,
  DeleteUserAccessModal,
  List,
} from "components";
import { ProjectContext } from "context";
import { User } from "types";

const removeUserFromList = async (url: string) => await axios.patch(url);

export const UserList = () => {
  const { users, hasPermission } = useContext(ProjectContext);
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
    }
  );

  return (
    <Card>
      <List title="Users in project" emptyMessage="No users">
        {users?.map((user: User) => (
          <React.Fragment key={user._id}>
            <List.Item
              key={user._id}
              icon={
                hasPermission && (
                  <DeleteButton
                    title="Delete project"
                    onClick={() => setSelectedUser(user)}
                  />
                )
              }
            >
              {user.name}
            </List.Item>

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
      </List>

      {hasPermission && availableUsers?.length > 0 && (
        <CardActions>
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
        </CardActions>
      )}
    </Card>
  );
};
