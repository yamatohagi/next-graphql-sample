import { Pagination, Box } from '@mui/material';
import { Fragment } from 'react';
import { usePostsQuery, use_CountQuery } from 'src/generated/graphql';
import CreateButton from '../create/CreateButton';
import { ClimberPostItem, ClimberPostItemSkeleton } from '../components';
import { usePostsQueryVariables } from './hooks/usePostsQueryVariables';

export default function ClimberPostList() {
  const itemsPerPage = 5;
  const { postsQueryVariables, router, page } = usePostsQueryVariables(itemsPerPage);
  const { data, loading, refetch } = usePostsQuery({
    variables: postsQueryVariables,
  });
  const { data: postCountDate, loading: postCountLoading } = use_CountQuery();
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, mr: 0 }}>
        <CreateButton refetch={refetch} />
      </Box>
      <Box
        sx={{
          columnGap: 4,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {(loading || !data ? [...Array(9)] : data.posts).map((post, index) => (
          <Fragment key={index}>
            {post ? <ClimberPostItem post={post} /> : <ClimberPostItemSkeleton />}
          </Fragment>
        ))}
      </Box>

      <Pagination
        count={
          postCountDate?.aggregatePost?._count?._all && !postCountLoading
            ? Math.floor(postCountDate.aggregatePost._count._all / itemsPerPage) +
              (postCountDate.aggregatePost._count._all % itemsPerPage > 0 ? 1 : 0)
            : 100
        }
        color="primary"
        size="large"
        page={page} // Set the current page
        onChange={(event, value) => {
          router.push(`?page=${value}`, undefined, { shallow: true });
          window.scrollTo(0, 0);
        }}
        sx={{
          my: 10,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
