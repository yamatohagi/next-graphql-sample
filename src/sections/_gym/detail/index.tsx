import { useFindFirstGymQuery, useGymImpPostsQuery } from 'src/generated/graphql';

import { useRouter } from 'next/router';
import DetailCard from './component/DetailCard';
import GymItemSkeleton from '../components/GymItemSkeleton';
import ReplyItemSkeleton from './reply/ReplyItemSkeleton';
import ReplyCards from './reply/GymImpPostCards';
import CreateImpPost from './reply/CreateImpPost';
import { useGymImpPostsQueryVariables } from './reply/hooks/useGymImpPostsQueryVariables';

export default function ClimberPostDetail() {
  const router = useRouter();
  const gymId = Number(router.query.id);
  const { gymImpPostsQueryVariables } = useGymImpPostsQueryVariables(5, gymId);
  const { data, loading, refetch } = useFindFirstGymQuery({
    variables: {
      where: {
        id: { equals: gymId },
      },
    },
    skip: !gymId,
  });

  const {
    data: gymImpPost,
    loading: gymImpPostLoading,
    refetch: gymImpPostRefetch,
  } = useGymImpPostsQuery({
    variables: gymImpPostsQueryVariables,
    skip: !gymId,
  });

  return (
    <>
      {!loading && data ? <DetailCard gym={data?.findFirstGym} /> : <GymItemSkeleton />}

      {!gymImpPostLoading && gymImpPost ? (
        <ReplyCards impPosts={gymImpPost.gymImpPosts} />
      ) : (
        <ReplyItemSkeleton />
      )}
      <CreateImpPost
        gymId={gymId}
        refetch={() => {
          refetch();
          gymImpPostRefetch();
        }}
        replyCount={gymImpPost?.gymImpPosts.length || 0}
      />
    </>
  );
}
