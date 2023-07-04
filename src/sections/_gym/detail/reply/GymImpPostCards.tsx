/* eslint-disable import/no-duplicates */
import { Card, Typography, Divider, Stack, Box } from '@mui/material';
import { GymImpPostsQuery } from 'src/generated/graphql';
import Iconify from 'src/components/iconify/Iconify';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { LikeButton } from './components/like-button';

export default function GymImpPostCards({
  impPosts,
}: {
  impPosts: GymImpPostsQuery['gymImpPosts'];
}) {
  return (
    <div>
      {impPosts.map((impPost) => {
        const timeAgo = formatDistanceToNow(new Date(impPost.createdAt), {
          addSuffix: true,
          locale: ja,
        });
        return (
          <Card key={impPost.id} sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">{impPost.userName}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              <Iconify
                icon="ion:time"
                sx={{ pt: 0.1, mb: 0.4, height: '1.4em', verticalAlign: 'middle' }}
              />
              {timeAgo}
            </Typography>
            <Stack spacing={0.5} sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {impPost.content}
              </Typography>
            </Stack>
            <Stack
              spacing={0.5}
              sx={{ px: 3, pb: 2, pt: 2.3, mx: 4, color: 'text.secondary' }}
              direction="row"
              justifyContent="space-between"
            >
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Iconify icon="ps:chat-alt" width={17} sx={{ mr: 1 }} />{' '}
              {impPost.likes ? impPost.likes.length : 0}{' '}
            </Box> */}

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LikeButton likes={impPost.likes} postId={impPost.id} gymId={impPost.gymId} />
              </Box>
            </Stack>
          </Card>
        );
      })}
    </div>
  );
}
