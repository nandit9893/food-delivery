import { OrderModel } from "../models/order.models.js";
import { UserModel } from "../models/user.models.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address 
        })
        await newOrder.save();

        await UserModel.findByIdAndUpdate(req.body.userId, {cart:{}});

        const lineItem = req.body.items.map((item)=>({
            priceData: {
                currency: "inr",
                productData: {
                    name: item.name
                },
                unitAmount: item.price*100*80
            },
            quantity: item.quantity
        }))
        lineItem.push({
            priceData: {
                currency: "inr",
                productData: {
                    name: "Delivery Charges"
                },
                unitAmount: 2*100*80
            },
            quantity: 1
        })
    } catch (error) {
        
    }
}

export {
    placeOrder
}