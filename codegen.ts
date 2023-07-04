import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './generated/schema.gql',
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
