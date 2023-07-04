import { gql } from '@apollo/client';

gql`
  mutation CreateOneMountain($data: MountainCreateInput!) {
    createOneMountain(data: $data) {
      id
      name
    }
  }
`;
