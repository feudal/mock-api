import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { Field } from "types";
import { DeleteButton, FieldsTypeSelector } from "components";

export interface InterfaceInputProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export const InterfaceInput = ({ register, setValue }: InterfaceInputProps) => {
  const [fields, setFields] = useState<(Field | undefined)[]>([
    { name: "", type: [] },
  ]);
  register("fields", { required: true });
  useEffect(() => setValue("fields", fields), [fields, setValue]);
  const addField = () => setFields([...fields, { name: "", type: [] }]);

  const deleteField = (id: number) => {
    const newFields = [...fields];
    newFields[id] = undefined;
    setFields(newFields);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 1,
        padding: 1,
        border: (theme) => `1px solid ${theme.palette.grey[400]}`,
      }}
    >
      <Typography variant="h6">Interface</Typography>

      <Typography variant="caption" mb={1}>
        Field name must contain only letters and underscores, and be unique
      </Typography>

      {fields.map((field, idx) => {
        if (field === undefined) return null;

        return (
          <Grid key={idx} container spacing={1} alignItems="flex-start">
            <Grid item xs={3} mt={1}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                required
                label={`Field name - ${idx + 1}`}
                inputProps={{ pattern: "[a-zA-Z_]+" }}
                value={field?.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFields((prev) => {
                    const newFields = [...prev];
                    newFields[idx]!.name = e.target.value;
                    return newFields;
                  })
                }
              />
            </Grid>

            <Grid container xs={8} item spacing={1} mt={0}>
              <FieldsTypeSelector
                index={idx}
                required
                name="fields"
                setFields={setFields}
              />
            </Grid>

            {idx !== 0 && (
              <Grid container item xs={1} mt={1} alignContent="flex-end">
                <DeleteButton
                  title="Delete field"
                  sx={{ ml: "auto" }}
                  onClick={() => deleteField(idx)}
                />
              </Grid>
            )}
          </Grid>
        );
      })}

      <Button fullWidth variant="contained" sx={{ mt: 1 }} onClick={addField}>
        Add new field
      </Button>
    </Paper>
  );
};
