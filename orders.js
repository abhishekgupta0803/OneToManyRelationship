// one to many relationship example
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


main().then(()=>{
    console.log("Connect to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test_relationship');
}

const Order = new Schema({
    item:String,
    price:Number,
});

const customerSchema = new Schema({
     name:String,
     orders:[{
        type: Schema.Types.ObjectId,
        ref: "OrderModel",
     }]

});




const OrderModel = mongoose.model("OrderModel",Order);
const custModel = mongoose.model("custModel",customerSchema);

const addCust = async ()=>{
    let custData = new custModel({
        name:"Abhishek",
    })

    let ord1 = await OrderModel.findOne({item:"pizza"});
    let ord2 = await OrderModel.findOne({item:"fruits"});

    custData.orders.push(ord1);
    custData.orders.push(ord2);

    let custRslt = await custData.save();
    console.log(custRslt);
}
// 
addCust();

// const addOrders = async ()=>{
//    let dataOrder =  await OrderModel.insertMany(
    // [
        // {item:"pizza",price:60},
        // {item:"chips",price:20},
        // {item:"fruits",price:60},
    // ]
// );
// 
    // 
    // console.log(dataOrder);
// };
// 
// addOrders();