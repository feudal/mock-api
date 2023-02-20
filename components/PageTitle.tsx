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
  name?: string;
}

export const PageTitle = ({ entity, name }: PageTitleProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardActions>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Tooltip title={`Back to ${entity.toLowerCase()}s`} placement="top">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (router.pathname.includes("mock-api")) {
                  router.push(`/project/${router.query.projectId}`);
                } else {
                  router.push(`/project`);
                }
              }}
            >
              <ArrowBackIcon />
            </Button>
          </Tooltip>

          <Typography variant="h5" component="h2">
            {entity} name - {name}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};
