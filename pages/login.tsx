import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      style={{ height: "100%" }}
    >
      <Card elevation={5} sx={{ borderRadius: 3, padding: 3 }}>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Welcome to Mock Api
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {status === "unauthenticated" ? (
              <>
                Sign in your google account <br />
                to get started
              </>
            ) : (
              `You are signed in as ${
                session?.user?.name || session?.user?.email
              }`
            )}
          </Typography>
        </CardContent>

        <CardActions>
          {status === "unauthenticated" ? (
            <Button
              variant="contained"
              style={{ paddingInline: 50, marginInline: "auto" }}
              onClick={() => signIn()}
            >
              Sign in
            </Button>
          ) : (
            <Button
              href="/"
              variant="contained"
              style={{ paddingInline: 50, marginInline: "auto" }}
            >
              Go to home page
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
