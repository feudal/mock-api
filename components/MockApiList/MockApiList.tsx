import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { MockApi } from "types";
import { makeBEM } from "utils";
import { DeleteIcon } from "svg";

/* eslint-disable-next-line */
export interface MockApiListProps {}

const bem = makeBEM("mock-api-list");

export const MockApiList = (props: MockApiListProps) => {
  const [apis, setApis] = useState<{ data: MockApi[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUpdated, setIsUpdated] = useState<boolean | null>();

  useEffect(() => {
    if (isUpdated === false) return;
    setIsLoading(true);

    fetch("/api/mock-api")
      .then((res) => res.json())
      .then((data) => setApis(data))
      .catch((err) => {
        setIsError(true);
        toast.error("Something went wrong");
      });

    setIsLoading(false);
    setIsUpdated(false);
  }, [isUpdated]);

  const deleteApi = (id: string) =>
    fetch(`/api/mock-api/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setApis(data);
        setIsUpdated(true);
      })
      .catch((err) => toast.error("Something went wrong"));

  return (
    <div className={bem()}>
      <h2 className={bem("title")}>Api list</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}

      <ul className={bem("list")}>
        {apis?.data?.map((api) => (
          <li key={api._id} className={bem("item")}>
            /{api.name}
            <DeleteIcon onClick={() => deleteApi(api._id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
