import { gql } from '@apollo/client';

// gql`
//   query Posts {
//     posts {
//       id
//       title
//       content
//       _count {
//         PostLike
//       }

//       PostReply {
//         title
//       }
//     }
//   }
// `;

gql`
  query Posts($orderBy: [PostOrderByWithRelationInput!], $skip: Int, $take: Int) {
    posts(orderBy: $orderBy, skip: $skip, take: $take) {
      id
      title
      content
      _count {
        PostLike
      }

      PostReply {
        title
      }
    }
  }
`;

//create

gql`
  mutation CreateOnePost($data: PostCreateInput!) {
    createOnePost(data: $data) {
      id
    }
  }
`;
