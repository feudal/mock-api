import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Card, IconButton, Paper, Stack, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

export const UserCard = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Card sx={{ borderRadius: 10 }}>
      <Paper sx={{ padding: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{ fontSize: 14 }}>
            {session?.user?.name || session?.user?.email}
          </Typography>

          <IconButton
            color="primary"
            aria-label="sign out"
            onClick={() => signOut()}
          >
            <ExitToAppIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Card>
  );
};
