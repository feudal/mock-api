import { Card, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";

import { ProjectContext } from "context";
import { Interface } from "types";
import { pascalCase, stripSlashes } from "utils";

const NoInterface = ({ fieldType }: { fieldType?: string }) => (
  <Typography component="span" color="error" sx={text_style}>
    {fieldType}: interface not found
  </Typography>
);

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
        const fieldName = field.name;
        const fieldType = field.type?.[1];
        const interFace = interfaces?.find(
          (interFace) => interFace.name === fieldType
        );

        switch (field.type?.[0]) {
          case "enum":
            return (
              <Typography key={idx} component="span" sx={text_style}>
                {fieldName}: {fieldType}; <br />
              </Typography>
            );
          case "interface":
            if (!interFace)
              return <NoInterface key={idx} fieldType={fieldType} />;

            return (
              <Typography key={idx} component="span" sx={text_style}>
                {fieldName}: &#123; <br />
                {showInterFaceObject(interfaces, interFace)}
                <Typography sx={text_style}></Typography>
              </Typography>
            );
          case "array-of-interface":
            if (!interFace)
              return <NoInterface key={idx} fieldType={fieldType} />;

            return (
              <Typography key={idx} component="span" sx={text_style}>
                {fieldName}: Array &#123; <br />
                {showInterFaceObject(interfaces, interFace)}
                <Typography sx={text_style}></Typography>
              </Typography>
            );
          default:
            return (
              <Typography key={idx} component="span" sx={text_style}>
                {fieldName}: {field.type?.join("-")}; <br />
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
  const interFaceName = stripSlashes(pascalCase(interFace?.name));

  if (!interFace) return null;

  const interfaceObject = (
    <pre>
      <Typography variant="h6" mt={1} fontFamily="monospace">
        interface {interFaceName} &#123;
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
