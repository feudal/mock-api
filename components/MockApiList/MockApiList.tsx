import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { MockApi } from "types";
import { getError, makeBEM } from "utils";
import { DeleteIcon } from "svg";
import { MockApiContext } from "context";

/* eslint-disable-next-line */
export interface MockApiListProps {}

const bem = makeBEM("mock-api-list");

export const MockApiList = (props: MockApiListProps) => {
  const [apis, setApis] = useState<{ data: MockApi[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { needToUpdate, setNeedToUpdate } = useContext(MockApiContext);

  useEffect(() => {
    if (needToUpdate === false) return;
    setIsLoading(true);

    fetch("/api/mock-api")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => setApis(data))
      .catch((err) => {
        setIsError(true);
        toast.error(getError(err));
      });

    setIsLoading(false);
    setNeedToUpdate(false);
  }, [needToUpdate, setNeedToUpdate]);

  const deleteApi = (id: string) =>
    fetch(`/api/mock-api/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setApis(data);
        setNeedToUpdate(true);
      })
      .catch((err) => toast.error(getError(err)));

  return (
    <div className={bem()}>
      <h2 className={bem("title")}>API list</h2>

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
