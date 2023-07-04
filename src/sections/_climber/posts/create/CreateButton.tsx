import { useState } from 'react';
import Button from '@mui/material/Button';
import ClimberPostCreateModal from './ClimberPostCreateModal';

export default function CreateButton({ refetch }: { refetch: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" size="medium" sx={{ mb: 2 }}>
        新規投稿
      </Button>
      <ClimberPostCreateModal open={open} onClose={() => setOpen(false)} refetch={refetch} />
    </>
  );
}
