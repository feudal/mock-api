import { Card, Theme } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Interface } from "types";
import {
  DeleteInterfaceModal,
  EditInterfaceModal,
  List,
  Menu,
} from "components";
import { capitalize } from "utils";

interface InterfaceProps {
  interfaces?: Interface[];
  hasPermission?: boolean;
}

export const InterfaceList = ({
  interfaces,
  hasPermission,
}: InterfaceProps) => {
  const [selectedInterface, setSelectedInterface] = useState<Interface | null>(
    null
  );
  const [selectedEditInterface, setSelectedEditInterface] =
    useState<Interface | null>(null);

  const router = useRouter();

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
