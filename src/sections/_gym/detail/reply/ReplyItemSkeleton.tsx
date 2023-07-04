// @mui
import { Skeleton, Card, Box } from '@mui/material';

export default function ReplyItemSkeleton({ ...other }) {
  return (
    <Card {...other} sx={{ mt: 3 }}>
      <Box
        sx={{
          p: 3,
          gap: 3,
          display: 'grid',
        }}
      >
        <Skeleton variant="rectangular" sx={{ width: 1, height: 30, borderRadius: 0.5 }} />
      </Box>
      <Box
        sx={{
          p: 3,
          pt: 0,
          gap: 3,
          display: 'grid',
        }}
      >
        <Skeleton variant="rectangular" sx={{ width: 1, height: 60, borderRadius: 0.5 }} />
      </Box>
    </Card>
  );
}
