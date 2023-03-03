import axios from "axios";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import { MockApi } from "types";
import { DeleteButton, DeleteMockApiModal, List } from "components";
import { Card } from "@mui/material";

const deleteApi = async (url: string) => await axios.delete(url);

interface MockApiListProps {
  mockApis: MockApi[];
  hasPermission?: boolean;
}

export const MockApiList = ({ mockApis, hasPermission }: MockApiListProps) => {
  const [selectedApi, setSelectedApi] = useState<MockApi | null>(null);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/mock-api/${router.query.id}`,
    () => deleteApi(`/api/mock-api/${selectedApi?._id}`),
    {
      onSuccess: async () => {
        await mutate(`/api/project/${router.query.projectId}`);
        setSelectedApi(null);
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return (
    <Card>
      <List title="API list" emptyMessage="No API created yet">
        {mockApis?.map((api: MockApi) => (
          <React.Fragment key={api._id}>
            <List.Item
              href={`/project/${router.query.projectId}/mock-api/${api._id}`}
              icon={
                hasPermission && (
                  <DeleteButton
                    title="Delete api"
                    onClick={(e: SyntheticEvent) => {
                      e.preventDefault();
                      setSelectedApi(api);
                    }}
                  />
                )
              }
            >
              /{api.name}
            </List.Item>

            {hasPermission && (
              <DeleteMockApiModal
                apiName={api.name}
                open={selectedApi?._id === api._id}
                handleClose={() => setSelectedApi(null)}
                action={trigger}
                isLoading={isMutating}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};
