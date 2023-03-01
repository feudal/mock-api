import { Typography } from "@mui/material";
import React from "react";

import { Field } from "types";
import { pascalCase, stripSlashes } from "utils";

const text_style = {
  fontFamily: "monospace",
  margin: "-0.5rem 0 -0.5rem 1rem",
};

export interface MockApiInterfaceProps {
  name?: string;
  fields?: Field[];
}

export const MockApiInterface = ({ name, fields }: MockApiInterfaceProps) => {
  return (
    <pre>
      <Typography variant="h6" fontFamily="monospace">
        interface {stripSlashes(pascalCase(name))} &#123;
        <br />
        {fields?.map((field: Field, idx) => {
          if (field.type?.[0] === "enum") {
            return (
              <Typography key={idx} sx={text_style}>
                {field.name}: {field?.type[1]}; <br />
              </Typography>
            );
          } else if (field.type?.[0] === "interface") {
            return <p key={idx}>interface</p>;
          } else {
            return (
              <Typography key={idx} sx={text_style}>
                {field.name}: {field.type?.join("-")}; <br />
              </Typography>
            );
          }
        })}
        &#125;
      </Typography>
    </pre>
  );
};
