import { FC } from 'react';
import { Box } from '@mui/material';

type Props = {
  width: number;
  height: number;
  photoURL: string;
  orderNumber: number;
  photoImageId: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    orderNumber: number,
    photoImageId: string
  ) => void;
};

export const ImageDisplay: FC<Props> = ({
  width,
  height,
  photoURL,
  orderNumber,
  photoImageId,
  handleChange,
}) => (
  <Box sx={{ width, height }}>
    <label htmlFor={`file-input-${orderNumber}`}>
      <img src={photoURL} alt="img" style={{ width, height }} />
      <input
        id={`file-input-${orderNumber}`}
        type="file"
        value=""
        onChange={(e) => handleChange(e, orderNumber, photoImageId)}
        style={{ display: 'none' }}
      />
    </label>
  </Box>
);
