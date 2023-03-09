import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

const button_style = {
  textTransform: "none",
  mb: 2,
  padding: 2,
  display: "flex",
  justifyContent: "space-between",
};

const paper_style = {
  marginY: 2,
  padding: 2,
  overflowX: "scroll",
  boxShadow: (theme: Theme) => `inset 0 0 10px 10px ${theme.palette.divider}`,
};

export interface MockApiDataProps {
  data?: Object[];
  apiName?: string;
}

const deleteData = async (url: string) => await axios.delete(url);

export const MockApiData = ({ data, apiName }: MockApiDataProps) => {
  const [locationOrigin, setLocationOrigin] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);
  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/data/${apiName}`,
    deleteData,
    {
      onSuccess: () =>
        mutate(`/api/project/${query.projectId}?populateFields=true`),
    }
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLocationOrigin(window.location.origin);
  }, []);

  return (
    <Card>
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="h6">
          You can &quot;POST&quot;, &quot;GET&quot;, &quot;PUT&quot;,
          &quot;DELETE&quot;, &quot;PATCH&quot; on this endpoint
        </Typography>
      </CardContent>

      <Divider />

      <CardContent sx={{ padding: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={button_style}
          href={`${locationOrigin}/api/data/${apiName}`}
          target="_blank"
          endIcon={
            <Tooltip
              title={linkCopied ? "Copied!" : "Copy to clipboard"}
              placement="top"
            >
              <CopyAllIcon
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(
                    `${locationOrigin}/api/data/${apiName}`
                  );
                  setLinkCopied(true);
                }}
              />
            </Tooltip>
          }
        >
          {locationOrigin}/api/data/{apiName}
        </Button>

        <LoadingButton
          sx={{ paddingInline: 5 }}
          variant="contained"
          color="error"
          onClick={trigger}
          loading={isMutating}
        >
          Delete all data
        </LoadingButton>

        <Paper elevation={0} sx={paper_style} className="no-scrollbar">
          <pre>
            <code>data = {JSON.stringify(data, null, 2)}</code>
          </pre>
        </Paper>
      </CardContent>
    </Card>
  );
};
