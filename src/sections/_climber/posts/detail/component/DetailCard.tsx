/* eslint-disable import/no-duplicates */
import { FindFirstPostQuery } from 'src/generated/graphql';
import { Fragment } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Card, Stack, Divider, Typography, Box, Unstable_Grid2 as Grid } from '@mui/material';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { dayOfWeek } from '../../components/ClimberPostItem';
import { LikeButton } from '../../components/like-button';

const DetailCard = ({
  post,
  refetch,
}: {
  post: FindFirstPostQuery['findFirstPost'];
  refetch: () => void;
}) => {
  if (!post) return null;
  const {
    id,
    createdAt,
    content,
    title,
    gym,
    preferredDayAndTimes,
    climbingType,
    experienceMonths,
    belayMonths,
    grade,
    like,
    _count,
  } = post;

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ja });
  return (
    <Card
      sx={{
        '&:hover': {
          boxShadow: (theme) => (theme as any).customShadows.z24,
        },
      }}
    >
      <Stack sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2.5}>
          <TextMaxLine variant="h6" line={1}>
            {title}
          </TextMaxLine>
          {gym.image && (
            <Image
              alt={gym.name}
              src={gym.image}
              sx={{ width: 78, height: 78, borderRadius: 1, mr: 3 }}
            />
          )}
        </Stack>

        <Stack spacing={0.5} sx={{ mt: 3, mb: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Iconify icon="carbon:location" width={18} sx={{ mr: 0.5 }} />
            {gym.name}
          </Stack>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          <Iconify
            icon="ion:time"
            sx={{ pt: 0.1, mb: 0.4, height: '1.4em', verticalAlign: 'middle' }}
          />{' '}
          {timeAgo}
        </Typography>

        <Stack spacing={0.5} sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ color: 'text.disabled' }}>
            {content}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      <Grid
        container
        spacing={1.5}
        sx={{
          p: 3,
          pt: 0,
          pb: 0,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
        }}
      >
        <Grid xs={7}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="fluent:mountain-trail-20-filled" sx={{ mr: 1 }} />

            {experienceMonths < 12
              ? ` ${experienceMonths}ヶ月`
              : ` ${Math.floor(experienceMonths / 12)}年`}
            {`（ビレイ歴 `}
            {belayMonths < 12 ? ` ${belayMonths}ヶ月）` : ` ${Math.floor(belayMonths / 12)}年）`}
          </Stack>
        </Grid>

        <Grid xs={5}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:upgrade" sx={{ mr: 1 }} />
            {grade}
          </Stack>
        </Grid>

        <Grid xs={7}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="ic:outline-today" sx={{ mr: 1 }} />
            {preferredDayAndTimes.map((v) => (
              <Fragment key={v.id}>
                {v.dayAndTime[1] === '1' ? ( // '01'なら日曜・昼
                  <Box sx={{ mr: 1 }}>
                    {dayOfWeek[Number(v.dayAndTime[0])]}
                    <Iconify
                      icon="ph:sun-bold"
                      sx={{ height: '1.5em', verticalAlign: 'middle', pb: 0.5 }}
                    />
                  </Box>
                ) : (
                  // '12'なら月曜・夜
                  <Box sx={{ mr: 1 }}>
                    {dayOfWeek[Number(v.dayAndTime[0])]}
                    <Iconify
                      icon="icon-park-solid:moon"
                      sx={{ height: '1.5em', verticalAlign: 'middle', pb: 0.5 }}
                    />
                  </Box>
                )}
              </Fragment>
            ))}
          </Stack>
        </Grid>

        <Grid xs={5}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="guidance:climbing-wall" sx={{ mr: 1 }} />
            {climbingType === 'BOTH' ? 'BOULDER＆LEAD' : climbingType}
          </Stack>
        </Grid>
      </Grid>

      <Stack
        spacing={0.5}
        sx={{ px: 3, pb: 2, pt: 2.3, mx: 4, color: 'text.secondary' }}
        direction="row"
        justifyContent="space-between"
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon="ps:chat-alt" width={17} sx={{ mr: 1 }} /> {_count ? _count.replies : 0}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon="foundation:graph-bar" width={17} sx={{ mr: 1 }} />
          {_count ? _count.viewHistory : 0}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LikeButton likes={like} postId={id} refetch={refetch} />
        </Box>
      </Stack>
    </Card>
  );
};

export default DetailCard;
