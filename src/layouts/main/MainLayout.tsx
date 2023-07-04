// next
// @mui
import { Box } from '@mui/material';
// config
//

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>{children}</Box>;
}
