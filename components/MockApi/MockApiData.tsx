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
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";

const BUTTON_STYLE = {
  textTransform: "none",
  mb: 2,
  padding: 2,
  display: "flex",
  justifyContent: "space-between",
};

const PAPER_STYLE = {
  marginY: 2,
  padding: 2,
  overflowX: "scroll",
  boxShadow: (theme: Theme) => `inset 0 0 10px 10px ${theme.palette.divider}`,
};

export interface MockApiDataProps {
  data?: Object[];
  apiName?: string;
}

const deleteData = async (name?: string) => {
  if (!name) return;

  await axios
    .delete(`/api/data/${name}`)
    .catch((err) => toast.error(err.response.data.error));
};

export const MockApiData = ({ data, apiName }: MockApiDataProps) => {
  const [locationOrigin, setLocationOrigin] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);
  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLocationOrigin(window.location.origin);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          You can &quot;POST&quot;, &quot;GET&quot;, &quot;PUT&quot;,
          &quot;DELETE&quot;, &quot;PATCH&quot; on this endpoint
        </Typography>
      </CardContent>

      <Divider />

      <CardContent>
        <Button
          fullWidth
          variant="outlined"
          sx={BUTTON_STYLE}
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

        <Button
          variant="contained"
          color="error"
          onClick={async () => {
            await deleteData(apiName);
            mutate(`/api/mock-api/${query.id}`);
          }}
        >
          Delete all data
        </Button>

        <Paper elevation={0} sx={PAPER_STYLE} className="no-scrollbar">
          <pre>
            <code>data = {JSON.stringify(data, null, 2)}</code>
          </pre>
        </Paper>
      </CardContent>
    </Card>
  );
};
