import { Grid, CircularProgress, Typography, Card } from "@mui/material";
import React from "react";

interface StateCardProps {
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

export const StateCard = ({ isLoading, isError, error }: StateCardProps) => {
  if (isLoading) isError = false;

  return (
    <Card>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        height="40vh"
        minHeight={150}
      >
        {isLoading && <CircularProgress size={100} />}
        {isError && (
          <Typography align="center" variant="h4" color="error">
            {error ? (
              error
            ) : (
              <>
                Something <br /> went wrong
              </>
            )}
          </Typography>
        )}
      </Grid>
    </Card>
  );
};
