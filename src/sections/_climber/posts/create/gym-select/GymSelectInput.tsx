import { ObservableQuery } from '@apollo/client';
import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { RHFAutocompleteAddItem } from 'src/components/hook-form';
import Iconify from 'src/components/iconify/Iconify';
import { CreateOneGymMutation, GymOptionsQuery } from 'src/generated/graphql';
import GymCreateModal from 'src/sections/_gym/create/GymCreateModal';

export const GymSelectInput = ({
  gyms,
  refetch,
  setFormValue,
}: {
  gyms: GymOptionsQuery['gyms'];
  refetch: ObservableQuery['refetch'];
  setFormValue: (value: CreateOneGymMutation) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState('');

  const handleClose = () => {
    setOpen(false);
    setDialogValue('');
  };

  return (
    <>
      <Grid item xs={8} sm={6}>
        <GymCreateModal
          open={dialogValue !== '' || open}
          refetch={refetch}
          onClose={handleClose}
          defaultName={dialogValue}
          afterSubmit={setFormValue}
        />
        <RHFAutocompleteAddItem
          name="gymId"
          label="ジム名"
          setDialogValue={setDialogValue}
          options={gyms.map((item) => ({ value: item.id.toString(), label: item.name }))}
        />
      </Grid>
      <Grid item xs={4} sm={6}>
        <Button
          sx={{ my: 1 }}
          size="medium"
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<Iconify icon="eva:plus-fill" sx={{ with: 3 }} />}
        >
          <Typography variant="subtitle2"> 登録</Typography>
        </Button>
      </Grid>
    </>
  );
};
