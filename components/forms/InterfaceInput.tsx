import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { Field } from "types";
import { ChipsInput, FieldsTypeSelector } from "components";

export interface InterfaceInputProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export const InterfaceInput = ({ register, setValue }: InterfaceInputProps) => {
  const [fields, setFields] = useState<(Field | undefined)[]>([
    { name: "", type: [] },
  ]);
  const [enumFields, setEnumFields] = useState<(Field | undefined)[]>([
    { name: "", choices: [] },
  ]);

  register("fields", { required: true });
  register("enumFields");
  useEffect(() => setValue("fields", fields), [fields, setValue]);
  useEffect(() => setValue("enumFields", enumFields), [enumFields, setValue]);
  const addField = () => setFields([...fields, { name: "", type: [] }]);
  const addEnumField = () =>
    setEnumFields([...enumFields!, { name: "", choices: [] }]);

  const deleteField = (id: number) => {
    const newFields = [...fields];
    newFields[id] = undefined;
    setFields(newFields);
  };

  const deleteEnumField = (id: number) => {
    const newEnumFields = [...enumFields!];
    newEnumFields[id] = undefined;
    setEnumFields(newEnumFields);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2,
        padding: 2,
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
          <Grid key={idx} container spacing={1} alignItems="flex-end">
            <Grid item xs={5}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                required
                label={`Field name - ${idx + 1}`}
                inputProps={{ pattern: "[a-zA-Z_]+" }}
                defaultValue={field?.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFields((prev) => {
                    const newFields = [...prev];
                    newFields[idx]!.name = e.target.value;
                    return newFields;
                  })
                }
              />
            </Grid>

            <Grid container xs={6} item spacing={1} mt={0}>
              <FieldsTypeSelector
                index={idx}
                required
                name="fields"
                setFields={setFields}
              />
            </Grid>

            {idx !== 0 && (
              <Grid container item xs={1} alignContent="flex-end">
                <IconButton
                  sx={{ ml: "auto" }}
                  onClick={() => deleteField(idx)}
                >
                  <Tooltip title="Delete field" placement="top">
                    <HighlightOffIcon color="error" />
                  </Tooltip>
                </IconButton>
              </Grid>
            )}
          </Grid>
        );
      })}

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={addField}>
        Add new field
      </Button>

      {enumFields.map((enumField, idx) => {
        if (enumField === undefined) return null;

        return (
          <Grid key={idx} container spacing={1} alignItems="flex-end">
            <Grid item xs={5}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label={`Enum field name - ${idx + 1}`}
                inputProps={{ pattern: "[a-zA-Z_]+" }}
                defaultValue={enumField?.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEnumFields((prev) => {
                    const newEnumFields = [...prev];
                    newEnumFields[idx]!.name = e.target.value;
                    return newEnumFields;
                  })
                }
              />
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
              <ChipsInput
                label="Enum choices"
                placeholder="Enter choices"
                onChange={(values) =>
                  setEnumFields((prev) => {
                    const newEnumFields = [...prev];
                    newEnumFields[idx]!.choices = values;
                    return newEnumFields;
                  })
                }
              />
            </Grid>

            {idx !== 0 && (
              <Grid container item xs={1} alignContent="flex-end">
                <IconButton
                  sx={{ ml: "auto" }}
                  onClick={() => deleteEnumField(idx)}
                >
                  <Tooltip title="Delete field" placement="top">
                    <HighlightOffIcon color="error" />
                  </Tooltip>
                </IconButton>
              </Grid>
            )}
          </Grid>
        );
      })}

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={addEnumField}
      >
        Add new enum field
      </Button>
    </Paper>
  );
};
