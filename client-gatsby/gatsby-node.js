const path = require('path');
const fs = require('fs');
const renameOverwrite = require('rename-overwrite')

// Move public folder to server destination
exports.onPostBuild = function() {
    renameOverwrite.sync(path.join(__dirname, 'public'), path.join(__dirname, '../server', 'public'))
};