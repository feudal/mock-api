import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export const UserCard = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography sx={{ fontSize: 14 }}>
        {session?.user?.name || session?.user?.email}
      </Typography>

      <Tooltip title="Sign out">
        <IconButton
          color="inherit"
          aria-label="sign out"
          onClick={() => signOut()}
        >
          <ExitToAppIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
