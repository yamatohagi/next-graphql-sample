// routes
import { paths } from 'src/routes/paths';

export const pageLinks = [
  {
    order: '4',
    subheader: 'Common',
    items: [
      { title: '404 Error', path: paths.page404 },
      { title: '500 Error', path: paths.page500 },
    ],
  },
];

export const navConfig = [
  { title: 'ホーム', path: '/' },
  { title: '山を登録する', path: paths.mountain.create },
];
