const myCOS = require('ibm-cos-sdk');

var config = {
  endpoint: '<endpoint>',
  apiKeyId: '<api-key>',
  ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
  serviceInstanceId: '<resource-instance-id>',
};

var cosClient = new myCOS.S3(config);
module.exports = costClient;
