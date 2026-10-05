import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        expenseId:{
            type:String,
            unique:true
        },
        amount:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        "sub-category":{
            type:String,
            required:false
        },
        date:{
            type:Date,
            default:Date.now
        },
    },
    {
        timestamps:true,
        toJSON:{
            transform: (doc, ret) => {
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    },
)

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;