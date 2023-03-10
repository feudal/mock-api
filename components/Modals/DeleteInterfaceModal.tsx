import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import { Interface } from "types";
import { Modal } from ".";

const deleteInterFace = async (url: string) => await axios.delete(url);

interface DeleteInterfaceModalProps {
  interFace: Interface;
  open: boolean;
  handleClose: () => void;
}

export const DeleteInterfaceModal = ({
  interFace,
  open,
  handleClose,
}: DeleteInterfaceModalProps) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/interface/${router.query.id}`,
    () => deleteInterFace(`/api/interface/${interFace?._id}`),
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
      title="Delete interface"
      actionLabel="delete"
      actionButtonProps={{ color: "error" }}
      action={trigger}
      isLoading={isMutating}
    >
      Are you sure you want to delete the interface <b>{interFace.name}</b>?{" "}
      <br />
      This action cannot be undone.
    </Modal>
  );
};
