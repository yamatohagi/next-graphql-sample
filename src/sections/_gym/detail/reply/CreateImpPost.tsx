import { Box, Card, Grid, Typography } from '@mui/material';
import {
  GymsDocument,
  GymsQueryResult,
  SortOrder,
  useCreateOneGymImpPostMutation,
} from 'src/generated/graphql';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextArea, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useApolloClient } from '@apollo/client';
import useReplyForm, { ReplyInput } from './hooks/useReplyForm';
import { CreateReplyProps } from './ service/types';

export default function CreateImpPost({ gymId, refetch, replyCount }: CreateReplyProps) {
  const [createOneGymImpPostMutation] = useCreateOneGymImpPostMutation();
  const client = useApolloClient();
  const methods = useReplyForm();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors: formErrors },
  } = methods;

  const handleReplySubmit = async (fv: ReplyInput) => {
    const { errors } = await createOneGymImpPostMutation({
      variables: {
        data: {
          ...fv,
          gym: {
            connect: { id: gymId },
          },
        },
      },
    });
    if (errors) return;
    await refetch();
    reset();

    const cacheData = client.cache.readQuery<GymsQueryResult['data']>({
      query: GymsDocument,
      variables: { orderBy: [{ createdAt: SortOrder.Desc }] },
    });

    const updatedPosts = cacheData?.gyms.map((gym) =>
      gym.id === gymId ? { ...gym, _count: { replies: replyCount } } : gym
    );

    client.cache.writeQuery({ query: GymsDocument, data: { gyms: updatedPosts } });
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
