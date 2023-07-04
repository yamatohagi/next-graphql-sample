// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Stack } from '@mui/material';
// config
import { HEADER } from 'src/config-global';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// routes

// components
import Logo from 'src/components/logo';
import SettingsDrawer from 'src/components/settings/drawer';
//
import HeaderShadow from '../components/HeaderShadow';

type Props = {
  isOffset: boolean;
};

export default function Header({ isOffset }: Props) {
  const theme = useTheme();

  return (
    <AppBar color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Logo />

        <Stack spacing={1} direction="row" alignItems="center">
          <SettingsDrawer />
        </Stack>
      </Toolbar>

      {isOffset && <HeaderShadow />}
    </AppBar>
  );
}
