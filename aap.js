const express=require("express");
const mysql2=require("mysql2");
const dotenv=require("dotenv")
const aap=express();
const port=3000;
const path=require("path");
//create database connection temporary here
dotenv.config({path: './.env'});

 const database= mysql2.createConnection({
   host:process.env.HOST,
   user:process.env.USER,
   password:process.env.PASSWORD,
   database:process.env.DATABASE
  });
  database.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("mysql connected");
    }
  });
  //   database connection end
const publicD=path.join(__dirname,'./views');
  aap.use(express.static(publicD));

  aap.use(express.urlencoded({extended:true}));
  aap.use(express.json());

  aap.set("view engine","ejs");
  //aap.set("views","./views")
  


aap.use("/",require("./routes/pages"));

aap.use("./auth",require("./routes/auth"));

aap.listen(port,()=>console.log(`server started at ${port}`));