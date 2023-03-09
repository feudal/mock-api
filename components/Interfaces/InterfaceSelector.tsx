import { Typography } from "@mui/material";
import { AutoCompleteMultiSelector } from "components";
import { useRouter } from "next/router";
import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Field, Interface } from "types";
import { pascalCase, stripSlashes } from "utils";

const text_style = {
  fontFamily: "monospace",
  margin: "-0.5rem 0 -0.5rem 1rem",
};

interface interFacesProps {
  interFaces: Interface[];
  selectedInterFace?: Interface;
}

export const InterfaceSelector = ({
  interFaces,
  selectedInterFace,
}: interFacesProps) => {
  const router = useRouter();
  const { register } = useForm();
  const [interFace, setInterFace] = React.useState<Interface | undefined>(
    selectedInterFace
  );

  useEffect(() => {
    setInterFace(selectedInterFace);
  }, [selectedInterFace]);

  useEffect(() => {
    if (interFace)
      router.push({
        pathname: router.pathname,
        query: { ...router.query, interfaceId: interFace?._id },
      });
  }, [interFace]);

  return (
    <>
      <AutoCompleteMultiSelector
        defaultValue={selectedInterFace?.name || ""}
        label="Interface name"
        placeholder="Enter interface name"
        options={interFaces?.map((interFace) => interFace.name)}
        {...register("interface")}
        onChange={async (e) => {
          setInterFace(
            interFaces.find((interFace) => interFace.name === e.target.value)
          );
        }}
      />

      {!interFace ? (
        <Typography variant="h6" mt={1} fontFamily="monospace">
          Interface not selected
        </Typography>
      ) : (
        <pre>
          <Typography variant="h6" mt={1} fontFamily="monospace">
            interface {stripSlashes(pascalCase(interFace?.name))} &#123;
            <br />
            {interFace?.fields?.map((field: Field, idx) => {
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
