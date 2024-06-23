import { TextField, IconButton, InputAdornment } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  handleClickShowPassword?: any;
  showPassword?: boolean | false;
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
  handleClickShowPassword,
  showPassword,
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
      color={values ? "success" : "error"}
      fullWidth
      multiline={multiline}
      rows={"4"}
      disabled={isDisabled ? isDisabled : false}
      className={className}
      //InputLabelProps={{ shrink: isShrink ? true : false }}
      sx={style}
      InputProps={{
        endAdornment: isEndAdornment ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              //onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}
