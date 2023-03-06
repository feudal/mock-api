import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { Modal } from ".";

const createMockApi = async (
  url: string,
  { arg: { name, projectId } }: { arg: { name: string; projectId: string } }
) => await axios.post(url, { name, projectId });

interface AddUserToProjectProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateMockApiModal = ({
  open,
  handleClose,
}: AddUserToProjectProps) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/mock-api`,
    createMockApi,
    {
      onSuccess: async () => {
        await mutate(`/api/project/${router.query.projectId}`);
        handleClose();
        reset();
      },
    }
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Create new API"
      actionLabel="create"
      modalStyles={{ width: 600 }}
      action={() =>
        handleSubmit((data) =>
          trigger({
            name: data.name,
            projectId: router.query.projectId as string,
          })
        )()
      }
      isLoading={isMutating}
    >
      <TextField
        required
        label="API name"
        placeholder="Enter API name"
        fullWidth
        variant="outlined"
        size="small"
        {...register("name")}
      />
    </Modal>
  );
};
