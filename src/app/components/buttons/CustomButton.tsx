import { Button } from "@mui/material";

export default function CustomButton({
  type = "button",
  variant = "contained",
  buttonText = "",
  className,
  disabled = false,
  onPress = () => {},
  style,
  size = "large",
}: any) {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled}
      className={`btn ${className}`}
      onClick={onPress}
      style={style}
      size={size}
    >
      {buttonText}
    </Button>
  );
}
