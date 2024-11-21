import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//config variables
const currency = "inr";
const deliveryCharge = 20;
const frontend_URL = "https://tomato-frontend-ppm5.onrender.com";

// Placing User Order for Frontend using stripe
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      const order = await orderModel.findById(orderId);
      const user = await userModel.findById(order.userId);

      // Prepare food details
      const foodDetails = order.items
        .map((item) => `${item.name} x ${item.quantity}`)
        .join(", ");

      // Send email to user
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Order Confirmation from Tomato",
        text: `Your payment has been successfully processed for your order with ID ${orderId}.\n\n You have ordered: ${foodDetails}.\n\n Thank you for choosing Tomato!\n\n\n Your order is now being processed.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not Verified" });
  }
};

// User Orders for Frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing Order for Admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Update the order status
    await orderModel.findByIdAndUpdate(orderId, { status });

    // Fetch the order and user details
    const order = await orderModel.findById(orderId);
    const user = await userModel.findById(order.userId);

    // Prepare food details
    const foodDetails = order.items
      .map((item) => `${item.name} x ${item.quantity}`)
      .join(", ");

    // Prepare the message content
    const message = `Your order with ID ${orderId} is now marked as "${status}".\n\n You have ordered: ${foodDetails}.\n\n Thank you for choosing Tomato!`;

    // Send email to user
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Your Order Status has been Updated`,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
