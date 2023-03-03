import {
  Box,
  Divider,
  Grid,
  List as MuiList,
  ListItemButton,
  ListItemText,
  ListSubheader,
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
  // doesn't work
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& span": {
    display: "unset",
  },
};

interface ListItemProps {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ListItem = ({ href, icon, children }: ListItemProps) => {
  return (
    <>
      {href ? (
        <Link href={href} passHref>
          <ListItemButton sx={item_style}>
            <ListItemText primary={children} />
            {icon}
          </ListItemButton>
        </Link>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingX={2}
          paddingY={1}
        >
          <ListItemText sx={item_style} primary={children} />
          {icon}
        </Grid>
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
