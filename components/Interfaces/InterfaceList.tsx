import { Card } from "@mui/material";
import React, { useContext, useState } from "react";

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
  const { interfaces, hasPermission } = useContext(ProjectContext);
  const [selectedInterface, setSelectedInterface] = useState<Interface | null>(
    null
  );
  const [selectedEditInterface, setSelectedEditInterface] =
    useState<Interface | null>(null);

  return (
    <Card>
      <List title="Interfaces list" emptyMessage="No Interfaces created yet">
        {interfaces?.map((interFace: Interface) => (
          <React.Fragment key={interFace._id}>
            <List.Item
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
