import { useApolloClient } from '@apollo/client';
import { IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import {
  PostsDocument,
  PostsQuery,
  PostsQueryResult,
  useCreateOnePostLikeMutation,
  useDeleteManyPostLikeMutation,
} from 'src/generated/graphql';
import { usePostsQueryVariables } from '../../list/hooks/usePostsQueryVariables';

export const LikeButton = ({
  likes,
  postId,
  refetch,
}: {
  likes: PostsQuery['posts'][0]['like'];
  postId: number;
  refetch?: () => void;
}) => {
  const [createOnePostLike] = useCreateOnePostLikeMutation();
  const [deleteManyPostLike] = useDeleteManyPostLikeMutation();
  const client = useApolloClient();
  const gestInfo = JSON.parse(localStorage.getItem('gestInfo') || 'null');
  const [checked, setChecked] = useState(likes.some((like) => like.userId === gestInfo.key));
  const { postsQueryVariables } = usePostsQueryVariables(5);

  const handleOnClick = async (checked: boolean, event: any) => {
    event.preventDefault();
    if (!gestInfo) return;

    if (checked) {
      await deleteManyPostLike({
        variables: {
          where: {
            userId: { equals: gestInfo.key },
          },
        },
        onCompleted: (data) => {
          if (refetch) refetch();
          const cacheData = client.cache.readQuery<PostsQueryResult['data']>({
            query: PostsDocument,
            variables: postsQueryVariables,
          });
          const updatedPosts = cacheData?.posts.map((post) =>
            post.id === postId
              ? { ...post, like: post.like.filter((like) => like.userId !== gestInfo.key) }
              : post
          );
          client.cache.writeQuery({ query: PostsDocument, data: { posts: updatedPosts } });
        },
      });
      setChecked(false);
    } else {
      await createOnePostLike({
        variables: {
          data: {
            userId: gestInfo.key,
            post: {
              connect: {
                id: postId,
              },
            },
          },
        },

        onCompleted: (data) => {
          if (refetch) refetch();
          const cacheData = client.cache.readQuery<PostsQueryResult['data']>({
            query: PostsDocument,
            variables: postsQueryVariables,
          });
          const updatedPosts = cacheData?.posts.map((post) =>
            post.id === postId ? { ...post, like: [...post.like, data.createOnePostLike] } : post
          );
          client.cache.writeQuery({ query: PostsDocument, data: { posts: updatedPosts } });
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
