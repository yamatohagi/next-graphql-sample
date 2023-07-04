import { gql } from '@apollo/client';
gql`
  mutation CreateOnePostLike($data: PostLikeCreateInput!) {
    createOnePostLike(data: $data) {
      id
      userId
      postId
    }
  }
`;
gql`
  mutation DeleteManyPostLike($where: PostLikeWhereInput) {
    deleteManyPostLike(where: $where) {
      count
    }
  }
`;
