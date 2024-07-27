import { Schema,model } from "mongoose";

const Transactions = new Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    date:{type:Date,required:true}
    
})

export  const Transaction = model("Transaction",Transactions);