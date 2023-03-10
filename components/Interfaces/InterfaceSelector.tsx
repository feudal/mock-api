import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { AutoCompleteMultiSelector, ShowInterface } from "components";
import { ProjectContext } from "context";
import { Interface } from "types";

export const InterfaceSelector = () => {
  const router = useRouter();
  const { register } = useForm();
  const { interFaces, mockApi } = useContext(ProjectContext);
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
        query: { ...router.query, selectedInterfaceId: interFace?._id },
      });
  }, [interFace]);

  return (
    <>
      <AutoCompleteMultiSelector
        label="Interface name"
        placeholder="Enter interface name"
        options={interFaces?.map((interFace) => interFace.name)}
        {...register("interface")}
        defaultValue={interFace?.name || ""}
        onChange={async (e) => {
          setInterFace(
            interFaces?.find((interFace) => interFace.name === e.target.value)
          );
        }}
      />

      {!interFace ? (
        <Typography variant="h6" mt={1} fontFamily="monospace">
          Interface not selected
        </Typography>
      ) : (
        <ShowInterface interFace={interFace} />
      )}
    </>
  );
};
