import {
  ApolloClient,
  ApolloProvider as ap,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { snackbarStore } from 'src/components/provider/snackbarStore';
import createEmotionCache from 'src/utils/createEmotionCache';

export const clientSideEmotionCache = createEmotionCache();

const successLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const operationType = (operation.query.definitions[0] as any).operation;

    if (operationType === 'mutation') {
      // Handle mutation response
      if (response.data) {
        snackbarStore.dispatch.snackbar.handleOpen({ message: '完了しました！', color: 'success' });
      }
    }
    return response;
  })
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`GraphQLエラーが発生しました: ${message}`);
      snackbarStore.dispatch.snackbar.handleOpen({ message, color: 'error' }); // SnackbarStoreを使ってメッセージを表示
      return undefined;
    });
  }

  if (networkError) {
    console.log(`ネットワークエラーが発生しました: ${networkError.message}`);
    snackbarStore.dispatch.snackbar.handleOpen({ message: networkError.message, color: 'error' }); // ネットワークエラーメッセージを表示
  }
});

const graphqlUri = 'http://localhost:8002/api/graphql/';

const httpLink = createHttpLink({
  uri: graphqlUri,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, successLink, httpLink]), // Ensure errorLink comes before httpLink
});

export const ApolloProvider = ap;
