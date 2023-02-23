import { Typography } from "@mui/material";
import React from "react";

import { Field } from "types";
import { pascalCase } from "utils";

const text_style = {
  fontFamily: "monospace",
  margin: "-0.5rem 0 -0.5rem 1rem",
};

export interface MockApiInterfaceProps {
  name?: string;
  fields?: Field[];
  enumFields?: Field[];
}

export const MockApiInterface = ({
  name,
  fields,
  enumFields,
}: MockApiInterfaceProps) => {
  return (
    <pre>
      <Typography variant="h6" fontFamily="monospace">
        interface {pascalCase(name)} &#123;
        <br />
        {fields?.map((field, idx) => (
          <Typography key={idx} sx={text_style}>
            {field.name}: {field?.type?.join("-")}; <br />
          </Typography>
        ))}
        {enumFields?.map((enumField, idx) => (
          <Typography key={idx} sx={text_style}>
            {enumField.name}: {enumField?.choices?.join(" | ")}; <br />
          </Typography>
        ))}
        &#125;
      </Typography>
    </pre>
  );
};
