import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") router.push("/");

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
            Sign in your google account <br />
            to get started
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            style={{ paddingInline: 50, marginInline: "auto" }}
            onClick={() => signIn()}
          >
            Sign in
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
