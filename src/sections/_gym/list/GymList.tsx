import { Pagination, Box } from '@mui/material';

import { Fragment } from 'react';
import { SortOrder, useAggregateGymQuery, useGymsQuery } from 'src/generated/graphql';

import { useRouter } from 'next/router';
import GymItem from '../components/GymItem';
import GymItemSkeleton from '../components/GymItemSkeleton';
import GymCreateButton from '../create/GymCreateButton';

export default function GymList() {
  const router = useRouter();
  const { query } = router;
  const page = query.page ? parseInt(query.page.toString(), 10) : 1;

  const itemsPerPage = 5;

  const { data, loading, refetch } = useGymsQuery({
    variables: {
      orderBy: [{ createdAt: SortOrder.Desc }],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    },
  });

  const { data: postCountDate, loading: postCountLoading } = useAggregateGymQuery();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, mr: 0 }}>
        <GymCreateButton refetch={refetch} />
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
        {(loading || !data ? [...Array(9)] : data.gyms).map((gym, index) => (
          <Fragment key={index}>{gym ? <GymItem gym={gym} /> : <GymItemSkeleton />}</Fragment>
        ))}
      </Box>

      <Pagination
        count={
          postCountDate?.aggregateGym?._count?._all && !postCountLoading
            ? Math.floor(postCountDate.aggregateGym._count._all / itemsPerPage) +
              (postCountDate.aggregateGym._count._all % itemsPerPage > 0 ? 1 : 0)
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
