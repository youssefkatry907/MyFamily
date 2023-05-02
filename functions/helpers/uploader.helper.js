let multer = require('multer');
const path = require('path');

exports.uploadImage = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(`file`, file);
      cb(null, Date.now() + '-' + path.extname(file.originalname))
    }
  })

  const upload = multer({ storage: storage });

  // var upload = multer({
  //     storage: storage,
  //     fileFilter: (req, file, cb) => {
  //         if (file) {
  //             if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
  //                 cb(null, true);
  //             } else {
  //                 cb(new multer.MulterError("Only .png, .jpg and .jpeg format allowed!"), false);
  //             }
  //         }
  //         else {
  //             cb(new multer.MulterError('image must be entered'), false);
  //         }

  //     },
  //     limits: { fileSize: 1000000000, files: 8 },
  // });


  return upload;

}

exports.handleFileUploadErrors = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
}