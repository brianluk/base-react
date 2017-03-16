const fetch = require('node-fetch');
const fs = require('fs');
const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql/utilities');
const path = require('path');
const schemaPath = path.join(__dirname, 'schema');

const SERVER = 'http://localhost:4000/graphql';

fetch(`${SERVER}`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({'query': introspectionQuery}),
}).then(res => res.json()).then(schemaJSON => {
  fs.writeFileSync(
    `${schemaPath}.json`,
    JSON.stringify(schemaJSON, null, 2)
  );

  const graphqlSchema = buildClientSchema(schemaJSON.data);
  fs.writeFileSync(
    `${schemaPath}.graphql`,
    printSchema(graphqlSchema)
  );
});

const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('./schema.json');

module.exports = getBabelRelayPlugin(schema.data);
