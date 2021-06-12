import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'salesforce-invoke',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { 
    hello: {
      handler: 'src/handler.handler',
      events: [
        {
          http: {
            path: '/',
            method: 'ANY',
          }
        },
      ],
      environment: {
        SOME_LOCAL_KEY_EXAMPLE: '1',
        NODE_ENV: 'production',
        /* CLIENTID: '${ssm:/sfdx/clientid~true}' */
      }
    } 
  },
};

module.exports = serverlessConfiguration;
