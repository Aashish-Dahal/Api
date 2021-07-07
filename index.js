const express=require("express");
const morgan=require("morgan");
const app=express();
const errorHandler=require("./middleware/error");
const expressLayout=require("express-ejs-layouts");
const home=require("./routes/dashboard/dashboard");
const dotenv=require("dotenv");
const colors=require("colors");
const PORT=process.env.PORT || 3000;
const cors=require("cors");
const clients={};
const connectDB=require("./config/db");
dotenv.config({path: "./config/config.env"});
const server=app.listen(PORT, "0.0.0.0", console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
const io=require("socket.io")(server);
connectDB();
const animalRouter=require("./routes/animals/domAnimals");
const auth=require("./routes/auth/auth");
const category=require("./routes/animals/category");
const parentCategory=require("./routes/animals/parentCategory");
const subCategory=require("./routes/animals/subCategory");
const farmImage=require("./routes/animals/farmImage");
const shopImage=require("./routes/animals/shopImage");
const meatCategory=require("./routes/meat/category");
const dietMeal=require("./routes/diet/dietMeal");
const meatSubcategory=require("./routes/meat/subCategory");
const chickenCategory=require("./routes/meat/chicken");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
if (process.env.NODE_ENV==="development") {
  app.use(morgan("dev"));
}
app.use("/user", auth);
app.use("/subcategory", subCategory);
app.use("/farmanimals", animalRouter);
app.use("/category", category);
app.use("/meatcategory", meatCategory);
app.use("/parentcategory", parentCategory);
app.use("/farmimage", farmImage);
app.use("/shopimage", shopImage);
app.use("/dietmeal", dietMeal);
app.use("/meatsubcategory", meatSubcategory);
app.use("/chicken", chickenCategory);
app.use("/", home);

app.use(expressLayout);
app.set("view engine", "ejs");
io.on("connection", (socket)=>{
  console.log("Connected");
  console.log(socket.id, "has joined");
  socket.on("signin", (id)=>{
    console.log(id);
    clients[id]=socket;
    console.log(clients);
  });
  socket.on("message", (msg)=>{
    console.log(msg);
    const targetId=msg.targetId;
    console.log(targetId);
    if (clients[targetId]) {
      clients[targetId].emit("message", msg);
    }
  });
});

app.use(errorHandler);

app.use("/uploads", express.static(__dirname+"/uploads"));
process.on("unhandledRejection", (err, promise)=>{
  console.log(`Error: ${err.message}`.red);
  server.close(()=>process.exit(1));
});

