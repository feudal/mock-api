import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { MockApi } from "types";
import { getError, kebabCase, makeBEM } from "utils";
import { Input, InterfaceInput } from "components";

const bem = makeBEM("mock-api-form");

export const MockApiForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  const createApi = (api: Partial<MockApi>) =>
    fetch(`/api/mock-api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(api),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
      })
      .then(() => router.reload())
      .catch((err) => toast.error(getError(err)));

  return (
    <div className={bem()}>
      <h2>Create new API</h2>

      <form
        className={bem("form")}
        onSubmit={handleSubmit((data) => {
          data.name = kebabCase(data.name);
          data.fields = data.fields.filter((field: any) => field !== undefined);
          createApi(data);
        })}
      >
        <Input label="API name" name="name" register={register} required />

        <InterfaceInput register={register} setValue={setValue} />

        <Button type="submit" variant="contained">
          Create
        </Button>
      </form>
    </div>
  );
};
