import {
  Box,
  Divider,
  List as MuiList,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

const list_style = {
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 1,
  overflow: "hidden",
};

const item_style = {
  fontStyle: "italic",
  padding: 1,
  // doesn't work
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& span": {
    display: "unset",
  },
};

interface ListItemProps extends DefaultComponentProps<any> {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ListItem = ({ href, icon, children, ...props }: ListItemProps) => {
  return (
    <>
      {href ? (
        <ListItemButton sx={item_style} {...props}>
          <Stack
            sx={{ width: "100%", ...props.xs }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link style={{ width: "100%" }} href={href} passHref>
              <ListItemText primary={children} />
            </Link>

            {icon}
          </Stack>
        </ListItemButton>
      ) : (
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingX={0}
          paddingY={0.5}
        >
          <ListItemText
            primary={children}
            sx={{ ...item_style, ...props.xs }}
            {...props}
          />
          {icon}
        </Stack>
      )}

      <Divider />
    </>
  );
};

interface ListProps extends DefaultComponentProps<any> {
  title: string;
  emptyMessage?: string;
}

export const List = ({
  title,
  emptyMessage,
  children,
  ...props
}: PropsWithChildren<ListProps>) => {
  return (
    <MuiList
      {...props}
      sx={list_style}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
    >
      <Divider />

      {!React.Children.count(children) && (
        <>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {emptyMessage || "No data"}
            </Typography>
          </Box>
          <Divider />
        </>
      )}

      {children}
    </MuiList>
  );
};

List.Item = ListItem;
