import { useApolloClient } from '@apollo/client';
import { IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import {
  GymImpPostsQuery,
  useCreateOneGymImpPostLikeMutation,
  useDeleteManyGymImpPostLikeMutation,
  GymImpPostsDocument,
} from 'src/generated/graphql';
import { useGymImpPostsQueryVariables } from '../../hooks/useGymImpPostsQueryVariables';

export const LikeButton = ({
  likes,
  postId,
  gymId,
  refetch,
}: {
  likes: GymImpPostsQuery['gymImpPosts'][0]['likes'];
  postId: number;
  gymId: number;
  refetch?: () => void;
}) => {
  const [createOneGymImpPostLike] = useCreateOneGymImpPostLikeMutation();
  const [deleteManyGymImpPostLike] = useDeleteManyGymImpPostLikeMutation();
  const client = useApolloClient();
  const gestInfo = JSON.parse(localStorage.getItem('gestInfo') || 'null');
  const [checked, setChecked] = useState(likes.some((like) => like.userId === gestInfo.key));
  const { gymImpPostsQueryVariables } = useGymImpPostsQueryVariables(5, gymId);

  const handleOnClick = async (checked: boolean, event: any) => {
    event.preventDefault();
    if (!gestInfo) return;

    if (checked) {
      await deleteManyGymImpPostLike({
        variables: {
          where: {
            userId: { equals: gestInfo.key },
          },
        },
        onCompleted: (data) => {
          if (refetch) refetch();
          const cacheData = client.cache.readQuery<GymImpPostsQuery>({
            query: GymImpPostsDocument,
            variables: gymImpPostsQueryVariables,
          });
          if (!cacheData) return;
          const updatedPosts = cacheData?.gymImpPosts.map((gymImpPost) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { likes, ...rest } = gymImpPost;
            return gymImpPost.id === postId
              ? { ...rest, likes: gymImpPost?.likes.filter((like) => like.userId !== gestInfo.key) }
              : gymImpPost;
          });
          client.cache.writeQuery<GymImpPostsQuery>({
            query: GymImpPostsDocument,
            data: { gymImpPosts: updatedPosts },
          });
        },
      });
      setChecked(false);
    } else {
      await createOneGymImpPostLike({
        variables: {
          data: {
            userId: gestInfo.key,
            GymImpPost: {
              connect: {
                id: postId,
              },
            },
          },
        },

        onCompleted: (data) => {
          if (refetch) refetch();
          const cacheData = client.cache.readQuery<GymImpPostsQuery>({
            query: GymImpPostsDocument,
            variables: gymImpPostsQueryVariables,
          });

          const updatedPosts = cacheData?.gymImpPosts.map((gymImpPost) =>
            gymImpPost.id === data.createOneGymImpPostLike.gymImpPostId
              ? { ...gymImpPost, likes: [...gymImpPost.likes, data.createOneGymImpPostLike] }
              : gymImpPost
          );

          client.cache.writeQuery({
            query: GymImpPostsDocument,
            data: { gymImpPosts: updatedPosts },
          });
        },
      });
      setChecked(true);
    }
  };

  return (
    <IconButton
      sx={{ display: 'flex', alignItems: 'center', p: 0 }}
      onClick={(event) => handleOnClick(checked, event)} // クリックイベントハンドラを修正
    >
      {checked ? (
        <Iconify icon="mdi:heart" width={17} sx={{ mr: 1, color: 'red' }} />
      ) : (
        <Iconify icon="mdi:heart-outline" width={17} sx={{ mr: 1 }} />
      )}

      <Typography> {likes.length}</Typography>
    </IconButton>
  );
};
