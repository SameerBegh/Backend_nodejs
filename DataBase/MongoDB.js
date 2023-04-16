import mongoose from "mongoose";

const Connection = async (URL) => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DataBase connected Successfully");
  } catch (error) {
    console.log("Error", error.message);
  }
};

export default Connection;
