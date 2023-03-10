import { Typography } from "@mui/material";
import { AutoCompleteMultiSelector } from "components";
import { ProjectContext } from "context";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Field, Interface } from "types";
import { pascalCase, stripSlashes } from "utils";

const text_style = {
  display: "block",
  margin: "-0.5rem 0 -0.5rem 1rem",
  fontFamily: "monospace",
};

export const showInterFace = (
  interfaces?: Interface[],
  interFace?: Interface
) => {
  if (!interFace) return null;

  return (
    <pre>
      {interFace.fields?.map((field: Field, idx) => {
        if (field.type?.[0] === "enum") {
          return (
            <Typography key={idx} component="span" sx={text_style}>
              {field.name}: {field?.type[1]}; <br />
            </Typography>
          );
        } else if (field.type?.[0] === "interface") {
          return (
            <Typography key={idx} component="span" sx={text_style}>
              {field.name}: &#123; <br />
              {showInterFace(
                interfaces,
                interfaces?.find(
                  (interFace) => interFace.name === field.type?.[1]
                )
              )}
              <Typography sx={text_style}>&#125;;</Typography>
            </Typography>
          );
        } else {
          return (
            <Typography key={idx} component="span" sx={text_style}>
              {field.name}: {field.type?.join("-")}; <br />
            </Typography>
          );
        }
      })}
      &#125;
    </pre>
  );
};

interface interFacesProps {
  interFaces: Interface[];
  selectedInterFace?: Interface;
}

export const InterfaceSelector = () => {
  const router = useRouter();
  const { register } = useForm();
  const { interfaces, mockApi } = useContext(ProjectContext);
  const selectedInterFace = mockApi?.interface;
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
        label="Interface name"
        placeholder="Enter interface name"
        options={interfaces?.map((interFace) => interFace.name)}
        {...register("interface")}
        defaultValue={interFace?.name || ""}
        onChange={async (e) => {
          setInterFace(
            interfaces?.find((interFace) => interFace.name === e.target.value)
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
            {showInterFace(interfaces, interFace)}
          </Typography>
        </pre>
      )}
    </>
  );
};
