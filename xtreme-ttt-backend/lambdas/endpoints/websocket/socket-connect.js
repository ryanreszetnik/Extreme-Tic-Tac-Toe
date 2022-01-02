const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const Responses = require("../../common/API_Responses");
const Formatting = require("../../common/Formatting");
const Dynamo = require("../../common/dynamo");
const Socket = require("../../common/socket");
const Database = require("../../common/CommonDatabaseCalls");
const SocketConstants = require("../../common/SocketConstants");
const Tables = require("../../common/TableConstants");
exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const accessToken = event["queryStringParameters"]["token"];

  var cognitoParams = {
    AccessToken: accessToken,
  };
  let user;
  try {
    user = await cognitoIdentityServiceProvider
      .getUser(cognitoParams)
      .promise();
  } catch (err) {
    return {
      statusCode: 500,
      body: "Failed to connect: " + JSON.stringify(err),
    };
  }
  const sub = user.UserAttributes.find((ob) => ob.Name === "sub").Value;
  await Dynamo.put(Tables.CONNECTIONS, { connId: connectionId, sub: sub });
  return Responses._200_socket("", {});
};
