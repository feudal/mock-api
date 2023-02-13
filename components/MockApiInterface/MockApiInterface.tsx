import React from "react";

import { Field } from "types";
import { makeBEM, pascalCase } from "utils";

export interface MockApiInterfaceProps {
  name?: string;
  fields?: Field[];
}

const bem = makeBEM("mock-api-interface");

export const MockApiInterface = ({ name, fields }: MockApiInterfaceProps) => {
  return (
    <pre className={bem()}>
      <h3>interface {pascalCase(name)} &#123;</h3>
      <ul style={{ marginLeft: 20 }}>
        {fields?.map((field) => (
          <li key={field.name}>
            {field.name}: {field.type.join("-")};
          </li>
        ))}
      </ul>
      <h3>&#125;</h3>
    </pre>
  );
};
