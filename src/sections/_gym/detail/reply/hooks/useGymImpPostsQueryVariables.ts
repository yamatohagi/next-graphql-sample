import { useRouter } from 'next/router';
import { SortOrder } from 'src/generated/graphql';

export const useGymImpPostsQueryVariables = (itemsPerPage: number, gymId: number) => {
  const router = useRouter();
  const { query } = router;
  const page = query.page ? parseInt(query.page.toString(), 10) : 1;

  const gymImpPostsQueryVariables = {
    where: {
      gymId: { equals: gymId },
    },
    orderBy: [{ createdAt: SortOrder.Desc }],
    take: itemsPerPage,
    skip: (page - 1) * itemsPerPage,
  };

  return { gymImpPostsQueryVariables, page, router };
};
