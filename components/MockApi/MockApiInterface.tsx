import { Typography } from "@mui/material";
import React from "react";

import { Field } from "types";
import { pascalCase } from "utils";

export interface MockApiInterfaceProps {
  name?: string;
  fields?: Field[];
}

export const MockApiInterface = ({ name, fields }: MockApiInterfaceProps) => {
  return (
    <pre>
      <Typography variant="h6" fontFamily="monospace">
        interface {pascalCase(name)} &#123;
        <br />
        {fields?.map((field, idx) => (
          <Typography
            key={idx}
            sx={{
              margin: "-0.5rem 0 -0.5rem 1rem",
              fontFamily: "monospace",
            }}
          >
            {field.name}: {field.type.join("-")}; <br />
          </Typography>
        ))}
        &#125;
      </Typography>
    </pre>
  );
};
