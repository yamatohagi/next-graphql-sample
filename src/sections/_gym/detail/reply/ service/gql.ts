import { gql } from '@apollo/client';

gql`
  mutation CreateOneGymImpPost($data: GymImpPostCreateInput!) {
    createOneGymImpPost(data: $data) {
      id
    }
  }
`;
