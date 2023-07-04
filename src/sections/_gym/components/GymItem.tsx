/* eslint-disable import/no-duplicates */
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import NextLink from 'next/link';
import { Box, Card, Link, Stack, Typography } from '@mui/material';
import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import { GymsQuery } from 'src/generated/graphql';

export default function GymItem({ gym }: { gym: GymsQuery['gyms'][number] }) {
  const { id, name, createdAt, climbingType, image, _count } = gym;

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ja });

  return (
    <Card
      sx={{
        '&:hover': {
          boxShadow: (theme) => (theme as any).customShadows.z24,
        },
      }}
    >
      <Link component={NextLink} href={`${paths.gym.index}/${id}`} color="inherit" underline="none">
        <Stack sx={{ p: 3, pb: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2.5}>
            <TextMaxLine variant="h6" line={1}>
              {name}
            </TextMaxLine>
            {image && (
              <Image
                alt={gym.name}
                src={image}
                sx={{ width: 78, height: 78, borderRadius: 1, mr: 3 }}
              />
            )}
          </Stack>

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            <Iconify
              icon="ion:time"
              sx={{ pt: 0.1, mb: 0.4, height: '1.4em', verticalAlign: 'middle' }}
            />
            {timeAgo}
          </Typography>

          <Stack spacing={0.5} sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ color: 'text.disabled' }}>
              {climbingType === 'BOTH' ? 'BOULDER＆LEAD' : climbingType}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          spacing={0.5}
          sx={{ px: 3, pb: 2, pt: 2.3, mx: 4, color: 'text.secondary' }}
          direction="row"
          justifyContent="space-between"
        />
        <Stack
          spacing={0.5}
          sx={{ px: 3, pb: 2, pt: 2.3, mx: 4, color: 'text.secondary' }}
          direction="row"
          justifyContent="space-between"
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon="ps:chat-alt" width={17} sx={{ mr: 1 }} />
            {_count ? _count.impPosts : 0}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon="foundation:graph-bar" width={17} sx={{ mr: 1 }} /> 開発中👷
            {/* {_count ? _count.viewHistory : 0} */}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <LikeButton likes={like} postId={id} /> */}
          </Box>
        </Stack>
      </Link>
    </Card>
  );
}

export const dayOfWeek = ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜'];
