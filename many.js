const mongoose = require('mongoose');
const Schema = mongoose.Schema;


main().then(()=>{
    console.log("Connect to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test_demo');

}

//schema
const orderSchema = new Schema({
    item:String,
    price:Number,
});

const customerSchema = new Schema({
    username:String,
    orders:[{
        type: Schema.Types.ObjectId,//reference
        ref: "OrderModel",
    }]
})

// mongoose middleware

customerSchema.post("findOneAndDelete", async (custData)=>{
    if(custData.orders.length){
      let rslt =  await order.deleteMany({_id: {$in: custData.orders}});
      console.log(rslt);
    }
});

//models

const order = mongoose.model("order",orderSchema);
const customer = mongoose.model("customer",customerSchema);

//delete customer data

const delCust = async()=>{
   const data =  await customer.findByIdAndDelete("686b7721f29d33e12ef5a895");
   console.log(data);
}

delCust();

//add customer data

// const addcust = async ()=>{
    //  const custData = new customer({
        // username:"Aman",
    //  });

    //  const data1 = await order.findOne({item:"Chips"});
    //  const data2 = await order.findOne({item:"Burger"});

    //  custData.orders.push(data1);
    //  custData.orders.push(data2);

    // await custData.save();
// }

// addcust();

//add orders data

// const addOrder = async ()=>{
    // const orderData = new order({
        // item:"Burger",
        // price:250,
    // });

//    await order.insertOne({item:"Chips",price:100});

// }

// addOrder();