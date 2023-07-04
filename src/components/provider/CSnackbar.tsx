import { useStoreState, useStoreActions } from 'easy-peasy';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';

import { Model } from './snackbarStore';
import Iconify from '../iconify/Iconify';

const Alert = React.forwardRef((props: any, ref: any) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const CSnackbar: React.FC<{}> = () => {
  const { open, message, color } = useStoreState<Model>((state) => state.snackbar);
  const { handleClose } = useStoreActions<Model>((actions) => actions.snackbar);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      action={
        <IconButton size="small" aria-label="close" color={color} onClick={handleClose}>
          <Iconify icon="material-symbols:close" width={16} sx={{ ml: 1 }} />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={color} sx={{ backgroundColor: color }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
