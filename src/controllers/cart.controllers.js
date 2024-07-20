import { UserModel } from "../models/user.models.js";


// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId);
        //console.log(userData);
        let cart = await userData.cart;
        if(!cart[req.body.itemId]) {
            cart[req.body.itemId] = 1;
        }
        else {
            cart[req.body.itemId] +=1;
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cart});
        res.json({success:true, message:"Added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// remove items from use cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId);
        //console.log(userData);
        let cart = await userData.cart;
        if(cart[req.body.itemId]>0) {
            cart[req.body.itemId] -= 1;
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cart});
        res.json({success:true, message:"Removed from cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId);
        const cart = await userData.cart;
        res.json({success:true, cart:cart});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"});
    }
}

export {
    addToCart,
    removeFromCart,
    getCart
}
