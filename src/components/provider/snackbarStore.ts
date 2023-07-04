import { IconButtonTypeMap } from '@mui/material';
import { createStore, action, Action } from 'easy-peasy';

export interface SnackbarModel {
  open: boolean;
  message: string;
  color?: IconButtonTypeMap['props']['color'];
  handleClose: Action<SnackbarModel, void>;
  handleOpen: Action<
    SnackbarModel,
    { message: string; color?: IconButtonTypeMap['props']['color'] }
  >;
}

export interface Model {
  snackbar: SnackbarModel;
}

const model: Model = {
  snackbar: {
    open: false,
    message: '',
    color: undefined,
    handleClose: action((s: any) => {
      s.open = false;
    }),
    handleOpen: action(
      (s: any, payload: { message: string; color?: IconButtonTypeMap['props']['color'] }) => {
        const { message, color } = payload;
        s.open = true;
        s.message = message;
        s.color = color;
      }
    ),
  },
};

export const snackbarStore = createStore(model);
