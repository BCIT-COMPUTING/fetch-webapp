const swaggerAutogen = require('swagger-autogen')()

const outputFile = './public/swagger_output.json'
const endpointsFiles = [
  './routes/auth.js',
  './routes/dog.js',
  './routes/match.js',
]

swaggerAutogen(outputFile, endpointsFiles);