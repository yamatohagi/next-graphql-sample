// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections

import ClimberPostsView from 'src/sections/_climber/view/ClimberPostsView';

ClimberPostsPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function ClimberPostsPage() {
  return (
    <>
      <Head>
        <title>投稿 | Climb Bond</title>
      </Head>

      <ClimberPostsView />
    </>
  );
}
