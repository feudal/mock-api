import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";

import { Interface } from "types";
import { DeleteButton, DeleteInterfaceModal, List } from "components";
import { Card } from "@mui/material";

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
  const router = useRouter();

  return (
    <Card>
      <List title="Interfaces list" emptyMessage="No Interfaces created yet">
        {interfaces?.map((interFace: Interface) => (
          <React.Fragment key={interFace._id}>
            <List.Item
              href={`/project/${router.query.projectId}/interface/${interFace._id}`}
              icon={
                hasPermission && (
                  <DeleteButton
                    title="Delete api"
                    onClick={(e: SyntheticEvent) => {
                      e.preventDefault();
                      setSelectedInterface(interFace);
                    }}
                  />
                )
              }
            >
              /{interFace.name}
            </List.Item>

            {hasPermission && (
              <DeleteInterfaceModal
                interFace={interFace}
                open={selectedInterface?._id === interFace._id}
                handleClose={() => setSelectedInterface(null)}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};
