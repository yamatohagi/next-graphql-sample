import { gql } from '@apollo/client';

gql`
  query FindFirstGym($where: GymWhereInput) {
    findFirstGym(where: $where) {
      _count {
        impPosts
      }
      id
      image
      name
      updatedAt
      createdAt
      climbingType
    }
  }
`;

gql`
  query GymImpPosts($where: GymImpPostWhereInput) {
    gymImpPosts(where: $where) {
      id
      createdAt
      updatedAt
      deletedAt
      userName
      title
      content
      gymId
      likes {
        id
        userId
        gymImpPostId
      }
    }
  }
`;
