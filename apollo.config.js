module.exports = {
  client: {
    includes: ['./src/**/*.ts'],
    service: {
      name: 'sample',
      url: 'http://localhost:8002/api/graphql',
    },
  },
};
