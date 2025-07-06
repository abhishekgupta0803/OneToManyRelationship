const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(()=>{
    console.log("Connect to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test_relationship');
}



//one to few relationship
const user = new Schema({
    username:String,
    address:[{
        _id: false,
        location:String,
        city:String,
    }],
});


const userData = mongoose.model("userData",user);

const data = async ()=>{
    let user1 = new userData({
        username:"Abhishek",
        address:[{
            location:"12 Birla Street bird Road",
            city:"Muzaffarnagar",
        }],
    })

    user1.address.push({location:"Shiv Chock",city:"Muzaffarnagar"});
    user1.address.push({location:"Gandhi caloni",city:"Muzaffarnagar"});
    let rslt = await user1.save();
    console.log(rslt);
};

data();





