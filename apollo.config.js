module.exports = {
  client: {
    includes: ['./src/**/*.ts'],
    service: {
      name: 'climb-bond',
      url: 'http://localhost:8002/api/graphql',
    },
  },
};
