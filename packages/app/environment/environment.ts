const ENV = process.env['NODE_ENV'] ?? 'development';

const environment = {
  development: {
    apiUrl: 'http://localhost:3000/',
  },
};

export const ENVIRONMENT = environment[ENV];
