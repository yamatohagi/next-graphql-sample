/* eslint-disable import/no-duplicates */
import { Card, Typography, Divider, Stack } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { RepliesQuery } from 'src/generated/graphql';
import { ja } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';

export default function ReplyCards({ replies }: { replies: RepliesQuery['replies'] }) {
  return (
    <div>
      {replies.map((reply) => {
        const timeAgo = formatDistanceToNow(new Date(reply.createdAt), {
          addSuffix: true,
          locale: ja,
        });

        return (
          <Card key={reply.id} sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">{reply.userName}</Typography>
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
                {reply.content}
              </Typography>
            </Stack>
          </Card>
        );
      })}
    </div>
  );
}
