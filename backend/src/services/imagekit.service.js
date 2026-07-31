const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

const uploadFile = async (fileBuffer, fileName) => {
  const response = await client.files.upload({
    file: fileBuffer.toString(
      "base64",
    ) /* ye base64 na likho to req unlimited chalti rhete hai */,
    fileName: fileName,
  });
  return response;
};

module.exports = { uploadFile };
