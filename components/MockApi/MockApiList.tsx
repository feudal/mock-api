import { useRouter } from "next/router";
import React, { useState } from "react";

import { MockApi } from "types";
import { CreateMockApiModal, DeleteMockApiModal, List, Menu } from "components";
import { Button, Card, CardActions } from "@mui/material";
import { EditMockApiModal } from "components/Modals/EditMockApiModal";

interface MockApiListProps {
  mockApis?: MockApi[];
  hasPermission?: boolean;
}

export const MockApiList = ({ mockApis, hasPermission }: MockApiListProps) => {
  const [selectedApi, setSelectedApi] = useState<MockApi | null>(null);
  const [selectedEditApi, setSelectedEditApi] = useState<MockApi | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  return (
    <Card>
      <List title="API list" emptyMessage="No API created yet">
        {mockApis?.map((api: MockApi) => (
          <React.Fragment key={api._id}>
            <List.Item
              href={`/project/${router.query.projectId}/mock-api/${api._id}`}
              icon={
                hasPermission && (
                  <Menu>
                    <Menu.Item onClick={() => setSelectedEditApi(api)}>
                      Edit
                    </Menu.Item>
                    <Menu.Item onClick={() => setSelectedApi(api)}>
                      Delete
                    </Menu.Item>
                  </Menu>
                )
              }
            >
              /{api.name}
            </List.Item>
            {hasPermission && (
              <EditMockApiModal
                mockApi={api}
                open={selectedEditApi?._id === api._id}
                handleClose={() => setSelectedEditApi(null)}
              />
            )}

            {hasPermission && (
              <DeleteMockApiModal
                mockApi={api}
                open={selectedApi?._id === api._id}
                handleClose={() => setSelectedApi(null)}
              />
            )}
          </React.Fragment>
        ))}
      </List>

      {hasPermission && (
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create new API
          </Button>

          <CreateMockApiModal
            open={isCreateModalOpen}
            handleClose={() => setIsCreateModalOpen(false)}
          />
        </CardActions>
      )}
    </Card>
  );
};
