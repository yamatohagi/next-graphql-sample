import Head from 'next/head';
import MainLayout from 'src/layouts/main';
import GymDetailView from 'src/sections/_gym/view/GymDetailView';

GymDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function GymDetailPage() {
  return (
    <>
      <Head>
        <title>ジム | Climb Bond</title>
      </Head>

      <GymDetailView />
    </>
  );
}
