import { Document, model, Schema } from "mongoose";
import { EBookCategory, EUnit, TBook } from "types/books";


export interface IBook extends TBook, Document {}

const bookSchema = new Schema({
    name: String,
    image: String,
    category: {
      type: String,
      enum: Object.values(EBookCategory),
    },
    code: Number,
    description: String,
    price: {
      type: {
        price: Number,
        tax: Number,
        discount: Number,
      },
      required: true,
    },
    stock: {
      type: {
        unit: {
          type: String,
          enum: Object.values(EUnit)
        },
        quantity: Number,
        date: {
          type: Date,
          default: Date.now,
        },
        enableLowStockAlert: Boolean,
        lowStockAlertQuantity: Number,
      },
      required: true,
    },
  });
  
  const Book = model<IBook>('Book', bookSchema);

  export default Book;
  