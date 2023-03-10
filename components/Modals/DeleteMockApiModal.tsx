import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import { MockApi } from "types";
import { Modal } from ".";

const deleteApi = async (url: string) => await axios.delete(url);

interface DeleteMockApiModalProps {
  mockApi: MockApi;
  open: boolean;
  handleClose: () => void;
}

export const DeleteMockApiModal = ({
  mockApi,
  open,
  handleClose,
}: DeleteMockApiModalProps) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/mock-api/${router.query.id}`,
    () => deleteApi(`/api/mock-api/${mockApi?._id}`),
    {
      onSuccess: async () => {
        await mutate(
          `/api/project/${router.query.projectId}?populateFields=true`
        );
        handleClose();
      },
    }
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Delete mock API"
      actionLabel="delete"
      actionButtonProps={{ color: "error" }}
      action={trigger}
      isLoading={isMutating}
    >
      Are you sure you want to delete the api <b>{mockApi.name}</b>? <br />
      This action cannot be undone.
    </Modal>
  );
};
