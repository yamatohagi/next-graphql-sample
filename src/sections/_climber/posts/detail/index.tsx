import { SortOrder, useFindFirstPostQuery, useRepliesQuery } from 'src/generated/graphql';

import { useRouter } from 'next/router';
import { ClimberPostItemSkeleton } from '../components';
import DetailCard from './component/DetailCard';
import ReplyCards from './reply/ReplyCards';
import CreateReply from './reply/CreateReply';
import ReplyItemSkeleton from './reply/ReplyItemSkeleton';

export default function ClimberPostDetail() {
  const router = useRouter();
  const postId = Number(router.query.id);

  const { data, loading, refetch } = useFindFirstPostQuery({
    variables: {
      where: {
        id: { equals: postId },
      },
    },
    skip: !postId,
  });

  const { data: repliesData, refetch: repliesRefetch } = useRepliesQuery({
    skip: !postId,
    variables: {
      where: {
        postId: { equals: postId },
      },
      orderBy: [
        {
          createdAt: SortOrder.Asc,
        },
      ],
    },
  });

  return (
    <>
      {!loading && data ? (
        <DetailCard
          post={data?.findFirstPost}
          refetch={() => {
            repliesRefetch();
            refetch();
          }}
        />
      ) : (
        <ClimberPostItemSkeleton />
      )}

      {repliesData ? <ReplyCards replies={repliesData?.replies} /> : <ReplyItemSkeleton />}

      <CreateReply
        postId={postId}
        refetch={() => {
          repliesRefetch();
          refetch();
        }}
        replyCount={repliesData?.replies.length || 0}
      />
    </>
  );
}
