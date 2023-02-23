import React from "react";
import { Modal } from ".";

interface DeleteMockApiModalProps {
  apiName: string;
  open: boolean;
  handleClose: () => void;
  action: () => void;
  isLoading?: boolean;
}

export const DeleteMockApiModal = ({
  apiName,
  open,
  handleClose,
  action,
  isLoading,
}: DeleteMockApiModalProps) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Delete mock API"
      actionLabel="delete"
      actionButtonProps={{ color: "error" }}
      action={action}
      isLoading={isLoading}
    >
      Are you sure you want to delete the api <b>{apiName}</b>? <br />
      This action cannot be undone.
    </Modal>
  );
};
