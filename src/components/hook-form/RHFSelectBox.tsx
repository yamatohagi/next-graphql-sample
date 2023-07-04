// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { MenuItem, TextField } from '@mui/material';

export default function RHFSelectBox({ options, name, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          value={field.value}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          <MenuItem value="">選択してください</MenuItem>

          {options.map((obj: any, i: any) => (
            <MenuItem key={i} value={obj.value}>
              {obj.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
