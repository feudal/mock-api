import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MockApi } from "types";

import { MockApiContext } from "context";
import { getError, makeBEM } from "utils";

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
        <label htmlFor="name">API name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          name="name"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};
