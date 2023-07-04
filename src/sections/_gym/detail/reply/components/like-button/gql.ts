import { gql } from '@apollo/client';
gql`
  mutation CreateOneGymImpPostLike($data: GymImpPostLikeCreateInput!) {
    createOneGymImpPostLike(data: $data) {
      id
      userId
      gymImpPostId
    }
  }
`;
gql`
  mutation DeleteManyGymImpPostLike($where: GymImpPostLikeWhereInput) {
    deleteManyGymImpPostLike(where: $where) {
      count
    }
  }
`;
