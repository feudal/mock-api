import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Typography,
  Card,
  CardActions,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ProjectContext } from "context";
import { pascalCase } from "utils";

const iconProps: {
  sx: { mr: number };
  color: "secondary";
  fontSize: "inherit";
} = { sx: { mr: 0.5 }, color: "secondary", fontSize: "inherit" };

interface BreadcrumbItemProps {
  isLast?: boolean;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const BreadcrumbItem = ({
  isLast,
  href,
  icon,
  children,
}: BreadcrumbItemProps) => {
  if (isLast) {
    return (
      <Typography
        sx={{ display: "flex", alignItems: "center" }}
        color="text.primary"
      >
        {icon}
        {children}
      </Typography>
    );
  }

  return (
    <Link href={href ?? "/"} passHref>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          "&:hover": { textDecoration: "underline" },
        }}
        color="inherit"
      >
        {icon}
        {children}
      </Typography>
    </Link>
  );
};

export const Breadcrumbs = () => {
  const { projectId, id, interfaceId } = useRouter().query;
  const { project, mockApi, interFaces } = useContext(ProjectContext);
  const interfaceName = interFaces?.find(
    (interfaceItem) => interfaceItem._id === interfaceId
  )?.name;

  return (
    <Card>
      <CardActions>
        <MUIBreadcrumbs aria-label="breadcrumb">
          <BreadcrumbItem
            isLast={projectId ? false : true}
            href="/project"
            icon={<HomeIcon {...iconProps} />}
          >
            All Projects
          </BreadcrumbItem>

          {project?.name && (
            <BreadcrumbItem
              isLast={id || interfaceId ? false : true}
              href={`/project/${projectId}`}
              icon={<FolderIcon {...iconProps} />}
            >
              {project?.name}
            </BreadcrumbItem>
          )}

          {(mockApi?.name || interfaceId) && (
            <BreadcrumbItem isLast>
              {mockApi?.name ?? pascalCase(interfaceName)}
            </BreadcrumbItem>
          )}
        </MUIBreadcrumbs>
      </CardActions>
    </Card>
  );
};
