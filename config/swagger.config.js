import SwaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    info: {
      title: 'LOCAL MARK API',
      version: '1.0.0',
      description: 'LOCAL MARK API with express, API 설명',
    },
    host: 'localhost:3000',
    basePath: '/', // basePath는 '/'로 설정하는 것이 일반적입니다.
  },
  apis: ['./src/routes/*.js', './swagger/*'],
};

const specs = SwaggerJsdoc(options);

export default specs;