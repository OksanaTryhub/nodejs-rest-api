const mongoose = require("mongoose");

const app = require("./app");
//avEF13kPXKUNp4Hv

const DB_HOST =
  "mongodb+srv://Oksana:avEF13kPXKUNp4Hv@cluster0.28dycdh.mongodb.net/contact_book?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
