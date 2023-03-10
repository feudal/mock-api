import { Card } from "@mui/material";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import { Interface } from "types";
import {
  DeleteInterfaceModal,
  EditInterfaceModal,
  List,
  Menu,
} from "components";
import { ProjectContext } from "context";
import { capitalize } from "utils";

export const InterfaceList = () => {
  const { query } = useRouter();
  const { project, interFaces, hasPermission } = useContext(ProjectContext);
  const [selectedInterface, setSelectedInterface] = useState<Interface | null>(
    null
  );
  const [selectedEditInterface, setSelectedEditInterface] =
    useState<Interface | null>(null);

  return (
    <Card>
      <List title="Interfaces list" emptyMessage="No Interfaces created yet">
        {interFaces?.map((interFace: Interface) => (
          <React.Fragment key={interFace._id}>
            <List.Item
              active={query.interfaceId === interFace._id}
              href={`/project/${project?._id}/interface/${interFace._id}`}
              icon={
                hasPermission && (
                  <>
                    <Menu>
                      <Menu.Item
                        onClick={() => setSelectedEditInterface(interFace)}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => setSelectedInterface(interFace)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu>

                    <EditInterfaceModal
                      interFace={interFace}
                      open={selectedEditInterface?._id === interFace._id}
                      handleClose={() => setSelectedEditInterface(null)}
                    />

                    <DeleteInterfaceModal
                      interFace={interFace}
                      open={selectedInterface?._id === interFace._id}
                      handleClose={() => setSelectedInterface(null)}
                    />
                  </>
                )
              }
            >
              {capitalize(interFace.name)}
            </List.Item>
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};
