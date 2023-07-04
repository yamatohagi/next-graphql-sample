import { gql } from '@apollo/client';

gql`
  query FindFirstPost($where: PostWhereInput) {
    findFirstPost(where: $where) {
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
  query Replies($where: ReplyWhereInput, $orderBy: [ReplyOrderByWithRelationInput!]) {
    replies(where: $where, orderBy: $orderBy) {
      id
      userName
      title
      content
      createdAt
    }
  }
`;
