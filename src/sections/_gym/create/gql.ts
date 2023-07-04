import { gql } from '@apollo/client';

gql`
  mutation CreateOneGym($data: GymCreateInput!) {
    createOneGym(data: $data) {
      id
      name
      image
      createdAt
      climbingType
    }
  }
`;
