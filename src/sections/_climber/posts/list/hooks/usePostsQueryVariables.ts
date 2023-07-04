import { useRouter } from 'next/router';
import { SortOrder } from 'src/generated/graphql';

export const usePostsQueryVariables = (itemsPerPage: number) => {
  const router = useRouter();
  const { query } = router;
  const page = query.page ? parseInt(query.page.toString(), 10) : 1;

  const postsQueryVariables = {
    orderBy: [{ createdAt: SortOrder.Desc }],
    take: itemsPerPage,
    skip: (page - 1) * itemsPerPage,
  };

  return { postsQueryVariables, page, router };
};
