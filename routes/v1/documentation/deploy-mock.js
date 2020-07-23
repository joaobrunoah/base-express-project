const fs = require('fs');
const axios = require('axios');

const apiDocText = fs.readFileSync(`${__dirname}/swagger.yaml`).toString('utf-8');

const MOCK_ADDR = '';
const MOCK_TOKEN = '';

try {
  // Remove old stubs
  axios.delete(`${MOCK_ADDR}/__admin/mappings`, {
    headers: {
      'Authorization':`Token ${MOCK_TOKEN}`
    }
  }).then(() => {
    // Create mock api from documentation
    axios.post(`${MOCK_ADDR}/__admin/imports/open-api-spec`, {
      "spec": apiDocText,
      "duplicatePolicy": "ALWAYS_OVERWRITE"
    }, {
      headers: {
        'Authorization': `Token ${MOCK_TOKEN}`
      }
    })
  });
} catch (e) {
  console.warn('Couldn\'t create API mock');
  console.warn(e);
}
