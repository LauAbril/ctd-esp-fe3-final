import { Box, TextField } from "@mui/material";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
  type: string;
}
const InputText: FC<Props> = ({name, label, defaultValue, type}) => {
  const {control} = useFormContext();

  const {
      field: {onChange, value, ref},
      formState: {errors}
  } = useController<Record<string, string>>({
      name: name,
      control,  
      defaultValue
  });

  return (
    <div>
      <Box mb={2}>
        <TextField
         onChange={onChange}
         value={value}
         label={label} 
         inputRef={ref}
         fullWidth 
         type={type}
         error={!!errors[name]}
         helperText={`${errors[name]?.message || ''}`}
        />
      </Box>
    </div>
  );
};
export default InputText;