// var uuid = require("uuid");
var AWS = require("aws-sdk");
var resLib = require('./libs/response-lib.js');
var dynamoDbLib = require('./libs/dynamodb-lib.js');

exports.main = async function(event, context) {
    const params = {
        TableName: "grade-events",
        Key: {
            id: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            // Return the retrieved item
            return resLib.success(result.Item);
        }
        else {
            return resLib.failure({ status: false, error: "Item not found." });
        }
    }
    catch (e) {
        return resLib.failure({ status: false });
    }
}
