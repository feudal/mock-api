import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { Modal } from ".";
import { MockApi } from "types";

const editMockApi = async (
  url: string,
  { arg: { name } }: { arg: { name: string } }
) => await axios.patch(url, { name });

interface EditMockApiModalProps {
  open: boolean;
  handleClose: () => void;
  mockApi: Partial<MockApi>;
}

export const EditMockApiModal = ({
  open,
  handleClose,
  mockApi,
}: EditMockApiModalProps) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/mock-api/${mockApi._id}`,
    editMockApi,
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
      title={
        <>
          Edit <b>&quot;{mockApi?.name}&quot;</b> API name
        </>
      }
      actionLabel="edit"
      modalStyles={{ width: 600 }}
      action={() => handleSubmit((data) => trigger({ name: data.name }))()}
      isLoading={isMutating}
    >
      <TextField
        required
        label="New API name"
        placeholder="Enter new API name"
        fullWidth
        variant="outlined"
        size="small"
        {...register("name")}
      />
    </Modal>
  );
};
