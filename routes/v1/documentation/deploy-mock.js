const fs = require('fs');
const axios = require('axios');

const apiDocText = fs.readFileSync(`${__dirname}/swagger.yaml`).toString('utf-8');

const MOCK_ADDR = 'https://pixaera-auth-provider.mocklab.io';
const MOCK_TOKEN = '9031c0a48e58871a65e72fb4115a2c72';

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
