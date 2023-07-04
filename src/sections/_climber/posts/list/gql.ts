import { gql } from '@apollo/client';

gql`
  query Posts($take: Int, $skip: Int, $orderBy: [PostOrderByWithRelationInput!]) {
    posts(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      title
      content
      gym {
        name
        image
      }
      grade
      experienceMonths
      belayMonths
      createdAt
      preferredDayAndTimes {
        id
        dayAndTime
      }
      climbingType
      like {
        id
        postId
        userId
      }
      _count {
        replies
        viewHistory
      }
    }
  }
`;

gql`
  query _count {
    aggregatePost {
      _count {
        _all
      }
    }
  }
`;
