import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { List, Drawer, IconButton } from '@mui/material';
// config
import { NAV } from 'src/config-global';
// components

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
//
import { NavProps } from '../types';
import NavList from './NavList';

export default function NavMobile({ data }: NavProps) {
  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: 'inherit', width: '32px', height: '32px' }}>
        <Iconify icon="clarity:menu-line" width={25} />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 4,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          {/* <Logo sx={{ mx: 2.5, my: 3 }} /> */}
          <IconButton onClick={handleClose} sx={{ mx: 1.5, my: 1 }}>
            <Iconify icon="fe:close" width={27} />
          </IconButton>

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
