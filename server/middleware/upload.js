const multer = require("multer"); 

const fs = require("fs"); 
const path = require("path");


// Upload types and folders
const settings = {
  avatar: {
    folder: "avatars",
    mimeTypes: ["image/jpeg", "image/png", "image/gif"],
  },
  logo: {
    folder: "logos",
    mimeTypes: ["image/jpeg", "image/png", "image/gif"],
  },
  resume: {
    folder: "resume",
    mimeTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  },
};


// Create storage
const storage = multer.diskStorage({
  // set destination folders
  destination: (req, file, cb) => {
    const type = file.fieldname;
    if (!settings[type]) return cb(new Error("Invalid field name"), false);
    const uploadDir = path.join(__dirname, `../data/uploads/${settings[type].folder}`);
    if (!fs.existsSync(uploadDir)) { fs.mkdirSync(uploadDir, { recursive: true });}
    cb(null, uploadDir);
  },
  // generate a file name
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const type = file.fieldname;
  if (!settings[type]) return cb(new Error("Invalid field name"), false);
  const isValid = settings[type].mimeTypes.includes(file.mimetype);
  if (isValid) cb(null, true);
  else cb(new Error(`File type not allowed for ${type}`), false);
};


// connect multer
const upload = multer({ storage, fileFilter }); 


module.exports = upload;