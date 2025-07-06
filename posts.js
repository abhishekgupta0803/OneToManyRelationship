//one to squillions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

main().then(()=>{
    console.log("Connect to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test_relationship');
}


const userSchema = new Schema({
    username:String,
    email:String,
});


const postSchema = new Schema({
      
      content:String,
      likes:Number,
      users:{
         type: Schema.Types.ObjectId,
          ref: "user",
      }
});

const user  = mongoose.model("user",userSchema);
const post  = mongoose.model("post",postSchema);


const addData  = async ()=>{

    //  const usr = new user({
        //  username:"Abhishek",
        //  email:"gupta123@gmail.com",
    //  });
    const usr = await user.findOne({username:"Abhishek"});

     const pst2 = new post({
          content:"Manu",
          likes:50,

     })

     pst2.users = usr;

    await usr.save();
    const data =  await pst2.save();
    console.log(data);

}

addData();
