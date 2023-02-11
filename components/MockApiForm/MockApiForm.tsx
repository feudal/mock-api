import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MockApi } from "types";

import { MockApiContext } from "context";
import { getError, makeBEM } from "utils";
import { Button, Input, InterfaceInput as InterfaceInput } from "components";

/* eslint-disable-next-line */
export interface MockApiFormProps {}

const bem = makeBEM("mock-api-form");

export const MockApiForm = (props: MockApiFormProps) => {
  const { register, handleSubmit } = useForm();
  const { setNeedToUpdate } = useContext(MockApiContext);

  const createApi = (api: Partial<MockApi>) =>
    fetch(`/api/mock-api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(api),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
      })
      .then(() => setNeedToUpdate(true))
      .catch((err) => toast.error(getError(err)));

  return (
    <div className={bem()}>
      <h2>Create new API</h2>

      <form
        className={bem("form")}
        onSubmit={handleSubmit((data) => createApi(data))}
      >
        <Input label="API name" name="name" register={register} required />

        <InterfaceInput register={register} />

        <Input
          label="How many objects to generate"
          name="count"
          register={register}
          type="number"
          min={1}
          max={100}
        />

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};
