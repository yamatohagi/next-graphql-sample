import { gql } from '@apollo/client';

gql`
  query Gyms($take: Int, $skip: Int, $orderBy: [GymOrderByWithRelationInput!]) {
    gyms(take: $take, skip: $skip, orderBy: $orderBy) {
      _count {
        impPosts
      }
      id
      name
      image
      createdAt
      climbingType
    }
  }
`;

gql`
  query AggregateGym {
    aggregateGym {
      _count {
        _all
      }
    }
  }
`;
