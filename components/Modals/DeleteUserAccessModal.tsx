import React from "react";
import { Modal } from ".";

interface DeleteUserAccessModalProps {
  userName: string;
  open: boolean;
  handleClose: () => void;
  action: () => void;
  isLoading?: boolean;
}

export const DeleteUserAccessModal = ({
  userName,
  open,
  handleClose,
  action,
  isLoading,
}: DeleteUserAccessModalProps) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Delete user access"
      actionLabel="delete"
      actionButtonProps={{ color: "error" }}
      action={action}
      isLoading={isLoading}
    >
      Are you sure you want to delete {userName} from the list?
    </Modal>
  );
};
