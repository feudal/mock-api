import { Autocomplete, Chip, TextField } from "@mui/material";
import { forwardRef } from "react";
import { ChangeHandler } from "react-hook-form";

interface Props {
  label: string;
  placeholder: string;
  options?: string[];
  helperText?: string;

  name: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;

  multiple?: boolean;
  value?: string[] | string;
}
export type Ref = HTMLInputElement;

export const AutoCompleteMultiSelector = forwardRef<Ref, Props>(
  (
    {
      label,
      placeholder,
      helperText,
      options = [],
      name,
      onChange,
      onBlur,
      multiple = false,
      value = [],
    },
    ref
  ) => (
    <Autocomplete
      value={value}
      multiple={multiple}
      size="small"
      fullWidth
      ref={ref}
      onBlur={onBlur}
      onChange={(_, newValue) =>
        onChange({ target: { name, value: newValue } })
      }
      options={options}
      getOptionLabel={(option) => option}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} key={option} />
        ))
      }
      renderInput={(params) => (
        <TextField
          helperText={helperText}
          {...params}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  )
);

AutoCompleteMultiSelector.displayName = "AutoCompleteMultiSelector";
