import { Card, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";

import { ProjectContext } from "context";
import { Interface } from "types";
import { pascalCase, stripSlashes } from "utils";

const text_style = {
  display: "block",
  margin: "-0.5rem 0 -0.5rem 1rem",
  fontFamily: "monospace",
};

export const showInterFaceObject = (
  interfaces?: Interface[],
  interFace?: Interface
) => {
  if (!interFace) return null;

  return (
    <pre>
      {interFace.fields?.map((field, idx) => {
        if (field.type?.[0] === "enum") {
          return (
            <Typography key={idx} component="span" sx={text_style}>
              {field.name}: {field?.type[1]}; <br />
            </Typography>
          );
        } else if (field.type?.[0] === "interface") {
          const interFace = interfaces?.find(
            (interFace) => interFace.name === field.type?.[1]
          );
          if (!interFace)
            return (
              <Typography
                key={idx}
                component="span"
                color="error"
                sx={text_style}
              >
                {field.type?.[1]}: interface not found
              </Typography>
            );
          return (
            <Typography key={idx} component="span" sx={text_style}>
              {field.name}: &#123; <br />
              {showInterFaceObject(interfaces, interFace)}
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

interface ShowInterfaceProps {
  interFace?: Interface;
  card?: boolean;
}

export const ShowInterface = ({ interFace, card }: ShowInterfaceProps) => {
  const { interFaces } = useContext(ProjectContext);

  const interfaceObject = (
    <pre>
      <Typography variant="h6" mt={1} fontFamily="monospace">
        interface {stripSlashes(pascalCase(interFace?.name))} &#123;
        <br />
        {showInterFaceObject(interFaces, interFace)}
      </Typography>
    </pre>
  );

  if (card) {
    return (
      <Card>
        <CardContent sx={{ p: 1 }}>{interfaceObject}</CardContent>
      </Card>
    );
  } else {
    return interfaceObject;
  }
};
