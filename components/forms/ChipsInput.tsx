import { Autocomplete, Chip, TextField } from "@mui/material";
import React from "react";

interface ChipsInputProps {
  label: string;
  placeholder: string;
  onChange: (newValue: string[]) => void;
}

export const ChipsInput = ({
  label,
  placeholder,
  onChange,
}: ChipsInputProps) => {
  const [_, setReceivers] = React.useState<string[]>([]);

  return (
    <Autocomplete
      size="small"
      multiple
      id="tags-filled"
      options={[]}
      defaultValue={[]}
      freeSolo
      onChange={(e, newValue) => onChange(newValue)}
      renderTags={(
        value: string[],
        getTagProps: (arg0: { index: number }) => JSX.IntrinsicAttributes
      ) =>
        value.map((option: string, index: number) => {
          setReceivers(value);
          return (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
};
