const mysql2=require("mysql2");
const bcrypt=require("bcryptjs");

const database= mysql2.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
   });


exports.register=(req,res)=>{
    console.log(req.body);

    // const name=req.body.name;
    // const email=req.body.email;
    // const password=req.body.password;
    // const confirmpassword=req.body.Passwordconfirm;
    // alert("form submitted succesfully");
    const {name,email,password,passwordconfirm}=req.body;

    database.query(`select email from loginpage where email=?`,[email],async(error,result)=>{
        if(error){
            console.log(error);
        }
        if(result.length>0){
            return res.render("register",{massage:"that email in already use"});

        }else if(password !== passwordconfirm){
            return res.render("register",{massage:"password do not match"});
        }
        let hashpassword=await bcrypt.hash(password,8);
        console.log(hashpassword);
        // return res.send("form submitted");

        database.query(`insert into loginpage set= ?`,{name:name, email:email,password:hashpassword},(error,result)=>{
            if(error){
                console.log(error);
            }
            else{
                return res.render("register",{
                  message:"user registered"
                })
            }
        })
    });
   

   
}