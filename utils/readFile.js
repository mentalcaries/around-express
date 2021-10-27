const fsPromises = require("fs").promises;

const getFileData = (filePath) => {
  return fsPromises
    .readFile(filePath, { encoding: "utf8" })
    .then((data) => JSON.parse(data))
    .catch((err) =>`Message: "${err}"`);
};

module.exports = getFileData;
