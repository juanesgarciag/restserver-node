import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    });

    console.log('Conectado a la DB');
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de la conexión con la DB");
  }
};

export { dbConnection };
