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
}
export type Ref = HTMLInputElement;

export const AutoCompleteMultiSelector = forwardRef<Ref, Props>(
  (
    { label, placeholder, helperText, options = [], name, onChange, onBlur },
    ref
  ) => (
    <Autocomplete
      multiple
      size="small"
      fullWidth
      onChange={(event, newValue) =>
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
          name={name}
          ref={ref}
          onBlur={onBlur}
          onChange={(v) => console.log({ v })}
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
