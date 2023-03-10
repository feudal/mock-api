import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { Modal } from ".";
import { Project } from "types";

const editProject = async (
  url: string,
  { arg: { name } }: { arg: { name: string } }
) => await axios.patch(url, { name });

interface EditProjectModalProps {
  open: boolean;
  handleClose: () => void;
  project: Partial<Project>;
}

export const EditProjectModal = ({
  open,
  handleClose,
  project,
}: EditProjectModalProps) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/project/${project._id}`,
    editProject,
    {
      onSuccess: async () => {
        await mutate("/api/project");
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
          Edit <b>&quot;{project?.name}&quot;</b> Project name
        </>
      }
      actionLabel="edit"
      modalStyles={{ width: 600 }}
      action={() => handleSubmit((data) => trigger({ name: data.name }))()}
      isLoading={isMutating}
    >
      <TextField
        required
        label="New Project name"
        placeholder="Enter new Project name"
        fullWidth
        variant="outlined"
        size="small"
        defaultValue={project?.name}
        {...register("name")}
      />
    </Modal>
  );
};
