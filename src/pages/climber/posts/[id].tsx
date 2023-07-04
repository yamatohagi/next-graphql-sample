import Head from 'next/head';
import MainLayout from 'src/layouts/main';
import ClimberPostsDetailView from 'src/sections/_climber/view/ClimberPostsDetailView';

ClimberPostsPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function ClimberPostsPage() {
  return (
    <>
      <Head>
        <title>投稿 | Climb Bond</title>
      </Head>

      <ClimberPostsDetailView />
    </>
  );
}
