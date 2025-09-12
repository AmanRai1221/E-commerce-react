import { Schema, model, Types } from 'mongoose';

const cartItemSchema = new Schema(
    {
        itemId: { type: Types.ObjectId, ref: 'Item', required: true },
        qty: { type: Number, required: true, min: 1, default: 1 },
    },
    { _id: false }
);

const cartSchema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
        items: { type: [cartItemSchema], default: [] },
    },
    { timestamps: true }
);

export default model('Cart', cartSchema);