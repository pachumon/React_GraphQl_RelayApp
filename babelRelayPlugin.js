var getBabelRelayPlugin = require("babel-plugin-relay");

var schemaData = require("./data/schema.json").data;

module.exports = getBabelRelayPlugin(schemaData);
