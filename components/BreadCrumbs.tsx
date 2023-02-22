import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";

import {
  Breadcrumbs as MUIBreadcrumbs,
  Typography,
  Link as MUILink,
  Card,
  CardActions,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

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
      <MUILink
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
      >
        {icon}
        {children}
      </MUILink>
    </Link>
  );
};

interface BreadcrumbsProps {
  projectName?: string;
  mockApiName?: string;
}

export const Breadcrumbs = ({ projectName, mockApiName }: BreadcrumbsProps) => {
  const { projectId, id } = useRouter().query;

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

          {projectName && (
            <BreadcrumbItem
              isLast={id ? false : true}
              href={`/project/${projectId}`}
              icon={<FolderIcon {...iconProps} />}
            >
              {projectName}
            </BreadcrumbItem>
          )}

          {mockApiName && <BreadcrumbItem isLast>{mockApiName}</BreadcrumbItem>}
        </MUIBreadcrumbs>
      </CardActions>
    </Card>
  );
};
