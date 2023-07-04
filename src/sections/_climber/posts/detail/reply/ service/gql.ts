import { gql } from '@apollo/client';

gql`
  mutation CreateOneReply($data: ReplyCreateInput!) {
    createOneReply(data: $data) {
      content
      postId
      title
      userName
    }
  }
`;
