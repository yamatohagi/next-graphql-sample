// next
import { Button, Card, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { SortOrder, useCreateOnePostMutation, usePostsQuery } from 'src/generated/graphql';
// layouts
import MainLayout from 'src/layouts/main';

// sections

HomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  const [createOnePostMutation] = useCreateOnePostMutation();
  const { data, loading, refetch } = usePostsQuery({
    variables: {
      orderBy: [{ id: SortOrder.Desc }],
      take: 5,
      skip: 0,
    },
  });

  const onSubmit = async () => {
    await createOnePostMutation({
      variables: {
        data: {
          title: 'テスト',
          content: '登録',
        },
      },
    });
    await refetch();
  };
  return (
    <>
      <Head>
        <title>ジあああ</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {data?.posts.map((post) => (
            <Card key={post.id} sx={{ mb: 3 }}>
              <Typography variant="h4">{post.title}</Typography>
              <Typography>{post.content}</Typography>
              <Typography variant="caption">いいね数：{post._count?.PostLike}</Typography>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button onClick={onSubmit}>登録</Button>
        </Grid>
      </Grid>
    </>
  );
}
