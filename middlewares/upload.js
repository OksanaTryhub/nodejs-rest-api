const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const date = new Date();
    const time = date.getTime();
    const filename = `${time}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
