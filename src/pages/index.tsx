// next
import { Button, Grid } from '@mui/material';
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';

// sections

HomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  return (
    <>
      <Head>
        <title>ジあああ</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button>あああ</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button>いいい</Button>
        </Grid>
      </Grid>
    </>
  );
}
