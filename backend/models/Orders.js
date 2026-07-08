import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderItemSchema = new Schema(
      {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            size: { type: String, required: true },
            pricePerUnit: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            category: { type: String },
            img: { type: String },
      },
      { _id: false }
);

const OrderSchema = new Schema({
      userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
      },
      order_data: {
            type: [OrderItemSchema],
            required: true,
      },
      totalAmount: {
            type: Number,
            required: true,
      },
      status: {
            type: String,
            default: "Placed",
      },
      orderDate: {
            type: Date,
            default: Date.now,
      },
});

export default mongoose.model("order", OrderSchema);
