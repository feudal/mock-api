import {
  Card,
  Stack,
  Tooltip,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

interface PageTitleProps {
  entity: string;
}

export const PageTitle = ({ entity }: PageTitleProps) => {
  const { id } = useRouter().query;

  return (
    <Card>
      <CardActions>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Tooltip title={`Back to ${entity.toLowerCase()}s`} placement="top">
            <Link href="/" passHref>
              <Button variant="contained" color="primary">
                <ArrowBackIcon />
              </Button>
            </Link>
          </Tooltip>

          <Typography variant="h5" component="h2">
            {entity} - {id}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};
