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

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/mock-api")
      .then((res) => res.json())
      .then((data) => setApis(data))
      .catch((err) => toast.error("Something went wrong"));

    setIsLoading(false);
  }, []);

  return (
    <div className={bem()}>
      <h2 className={bem("title")}>Api list</h2>

      {isLoading && <p>Loading...</p>}

      <ul className={bem("list")}>
        {apis?.data?.map((api) => (
          <li key={api._id} className={bem("item")}>
            {api.name}

            <DeleteIcon />
          </li>
        ))}
      </ul>
    </div>
  );
};
