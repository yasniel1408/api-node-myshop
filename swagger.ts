import router from './router';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'Doc API - MyShop', // by default: 'REST API'
    description: 'API Documentation for MyShop Applications' // by default: ''
  },
  host: 'http://localhost:5000', // by default: 'localhost:3000'
  basePath: '', // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '' // Tag description
    }
    // { ... }
  ],
  securityDefinitions: {
    info: {
      title: 'Doc API - MyShop',
      description: 'API Documentation for MyShop Applications',
      contact: {
        name: 'Yasniel Fajardo Egues',
        url: 'https://infsoft.home.blog'
      }
    }
  }, // by default: empty object (Swagger 2.0)
  definitions: {}, // by default: empty object
  components: {} // by default: empty object (OpenAPI 3.x)
};

const outputFile = './swagger.json';
const endpointsFiles = router.routes;

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
