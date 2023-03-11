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
  // display: "inline-block",
  maxWidth: "80%",

  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& span": {
    display: "unset",
  },
};

interface ListItemProps extends DefaultComponentProps<any> {
  active?: boolean;
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ListItem = ({
  active,
  href,
  icon,
  children,
  ...props
}: ListItemProps) => {
  return (
    <>
      {href ? (
        <ListItemButton
          sx={{
            backgroundColor: (theme) =>
              active ? theme.palette.primary.light : "transparent",
            ...props.xs,
          }}
          {...props}
        >
          <Stack
            sx={{ width: "100%" }}
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link style={{ width: "100%" }} href={href} passHref>
              <ListItemText sx={{ ...item_style }} primary={children} />
            </Link>

            <Box sx={{ position: "absolute", right: 16 }}>{icon}</Box>
          </Stack>
        </ListItemButton>
      ) : (
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingX={2}
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
