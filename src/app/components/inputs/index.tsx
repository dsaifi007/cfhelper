import { TextField } from "@mui/material";

interface Props {
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string | any;
  type?: string;
  onBlur?: any;
  values?: any;
  onChange?: any;
  style?: any;
  helperText?: any;
  error?: any;
  inpImg?: any;
  multiline?: boolean;
  rows?: any;
  className?: any;
  isRequired?: boolean;
  isDisabled?: boolean;
  isShrink?: boolean;
  focused: boolean;
  sizeval?: any | string;
  maxLength?: undefined | number;
  touched?: any;
  errors?: any;
  isEndAdornment?: boolean;
  onKeyDown?: any;
  readOnly?: boolean;
  handleInput?: any;
  regenerateText?: string | "";
  maxRows?: any;
  onPaste?: any;
}

export default function Input({
  label,
  placeholder,
  id,
  name,
  type,
  onBlur,
  values,
  onChange,
  style,
  inpImg,
  className,
  helperText,
  isRequired,
  isShrink,
  rows,
  error,
  touched,
  focused,
  sizeval,
  isDisabled,
  errors,
  maxLength = undefined,
  isEndAdornment = false,
  onKeyDown,
  readOnly,
  handleInput,
  regenerateText,
  multiline = false,
  maxRows = 0,
  onPaste,
}: Props) {
  return (
    <TextField
      autoFocus={focused}
      variant="outlined"
      autoComplete="off"
      onBlur={onBlur}
      id={id}
      value={values ? values : ""}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      name={name}
      required={isRequired}
      type={type}
      label={label}
      onPaste={onPaste}
      maxRows={maxRows}
      // size={sizeval}
      size="small"
      fullWidth
      multiline={multiline}
      rows={"1"}
      disabled={isDisabled ? isDisabled : false}
      className={className}
      //InputLabelProps={{ shrink: isShrink ? true : false }}
      sx={style}
    />
  );
}
