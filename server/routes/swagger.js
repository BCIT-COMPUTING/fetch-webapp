const swaggerAutogen = require('swagger-autogen')()

const outputFile = './public/swagger_output.json'
const endpointsFiles = [
  './routes/router.js',
]
swaggerAutogen(outputFile, endpointsFiles, {
  host: "localhost:8080",
  basePath: "/api/v1",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
});