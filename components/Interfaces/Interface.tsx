import { Typography } from "@mui/material";
import { AutoCompleteMultiSelector } from "components";
import React from "react";
import { useForm } from "react-hook-form";

import { Field, Interface as InterfaceType } from "types";
import { pascalCase, stripSlashes } from "utils";

const text_style = {
  fontFamily: "monospace",
  margin: "-0.5rem 0 -0.5rem 1rem",
};

export interface InterfaceProps {
  name?: string;
  fields?: Field[];
  interFaces?: { name: string }[];
}

export const Interface = ({ name, fields, interFaces }: InterfaceProps) => {
  const { register } = useForm();
  const [interFace, setInterFace] = React.useState<InterfaceType[]>([]);

  console.log({ interFaces, length: interFaces?.length });

  return (
    <>
      <AutoCompleteMultiSelector
        label="Interface name"
        placeholder="Enter interface name"
        options={interFaces?.map((interFace) => interFace.name)}
        {...register("emails")}
      />

      {!interFaces?.length ? (
        <Typography variant="h6" mt={1} fontFamily="monospace">
          Interface not selected
        </Typography>
      ) : (
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
      )}
    </>
  );
};
