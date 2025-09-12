import { Schema, model } from 'mongoose';

const itemSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, trim: true },
        image: { type: String, default: '' },
        description: { type: String, default: '' },
    },
    { timestamps: true }
);

export default model('Item', itemSchema);