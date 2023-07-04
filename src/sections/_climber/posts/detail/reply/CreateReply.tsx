import { Box, Card, Grid, Typography } from '@mui/material';
import {
  PostsDocument,
  PostsQueryResult,
  SortOrder,
  useCreateOneReplyMutation,
} from 'src/generated/graphql';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextArea, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useApolloClient } from '@apollo/client';
import useReplyForm, { ReplyInput } from './hooks/useReplyForm';
import { CreateReplyProps } from './ service/types';

export default function CreateReply({ postId, refetch, replyCount }: CreateReplyProps) {
  const [createOneReplyMutation] = useCreateOneReplyMutation();
  const client = useApolloClient();
  const methods = useReplyForm();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors: formErrors },
  } = methods;

  const handleReplySubmit = async (fv: ReplyInput) => {
    const { errors } = await createOneReplyMutation({
      variables: {
        data: {
          ...fv,
          post: {
            connect: { id: postId },
          },
        },
      },
    });
    if (errors) return;
    await refetch();
    reset();

    const cacheData = client.cache.readQuery<PostsQueryResult['data']>({
      query: PostsDocument,
      variables: { orderBy: [{ createdAt: SortOrder.Desc }] },
    });

    const updatedPosts = cacheData?.posts.map((post) =>
      post.id === postId ? { ...post, _count: { replies: replyCount } } : post
    );
    console.log(updatedPosts);
    client.cache.writeQuery({ query: PostsDocument, data: { posts: updatedPosts } });
  };

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Card sx={{ padding: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(handleReplySubmit)}>
          <Typography variant="h6">新規投稿</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
              <RHFTextField size="small" name="userName" label="なまえ" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <RHFTextArea size="small" name="content" label="内容" />
            </Grid>
          </Grid>

          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={Object.keys(formErrors).length > 0}
          >
            送信
          </LoadingButton>
        </FormProvider>
      </Card>
    </Box>
  );
}
