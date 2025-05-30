const fs = require("fs");
const path = require("path");


// set folders
const folderMap = {
  avatar: "avatars",
	logo: "logos",
  resume: "resume",
};


const deleteUploads = (req, fields) => {
  if (!req.files) return;
  fields.forEach((field) => {
    const files = req.files[field];
    const folder = folderMap[field];
    if (!folder || !files || files.length === 0) return;
    files.forEach((file) => {
      const filePath = path.join(__dirname, `../data/uploads/${folder}/${file.filename}`);
      fs.unlink(filePath, () => { });
    });
  });
};

module.exports = deleteUploads;
