import { Button, Paper, Tooltip, Typography } from "@mui/material";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { getError } from "utils";

export interface MockApiDataProps {
  data?: Object[];
  apiName?: string;
}

export const MockApiData = ({ data, apiName }: MockApiDataProps) => {
  const [locationOrigin, setLocationOrigin] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);
  const router = useRouter();

  const deleteData = (name?: string) => {
    if (!name) return;

    fetch(`/api/data/${name}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(() => router.reload())
      .catch((err) => toast.error(getError(err)));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLocationOrigin(window.location.origin);
  }, []);

  return (
    <div>
      <Typography variant="h5">
        You can &quot;POST&quot;, &quot;GET&quot;, &quot;PUT&quot;,
        &quot;DELETE&quot;, &quot;PATCH&quot; on this endpoint
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        sx={{
          textTransform: "none",
          marginY: 2,
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
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
        onClick={() => deleteData(apiName)}
      >
        Delete all data
      </Button>

      <Paper
        elevation={0}
        sx={{
          marginY: 2,
          padding: 2,
          overflowX: "scroll",
          boxShadow: (theme) => `inset 0 0 10px 10px ${theme.palette.divider}`,
        }}
        className="no-scrollbar"
      >
        <pre>
          <code>data = {JSON.stringify(data, null, 2)}</code>
        </pre>
      </Paper>
    </div>
  );
};
