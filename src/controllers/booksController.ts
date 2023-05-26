import { NextFunction, Request, Response } from "express";
import Book, { IBook } from "../models/Books";
import { EUnit, TBook } from "types/books";

export const fetchAllBooks = async (req : Request , res : Response , next :NextFunction) =>{
    //get books from book table of mongodb
    let {sortByLowStockAlert} = req.query;
    
    //sort based on low stock alert
    if(sortByLowStockAlert){
        let result = await Book.aggregate([
          {
            $match: {
              "stock.enableLowStockAlert": true,
              $expr: { $gte: ["$stock.lowStockAlertQuantity", "$stock.quantity"] }
            }
          },
          {
            $sort: {
              "stock.quantity": 1
            }
          }
        ])
        res.json(result);
      }
      else{
        let result = await Book.find();
        res.json(result);
      }
    //let result = await Book.find();

}

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract book data from request body
      const { name, image, category, code, description, price, stock } = req.body;
  
      // Create a new book document
      const newBook: TBook = {
        name,
        image,
        category,
        code,
        description,
        price,
        stock :{
            unit : EUnit.BOX,
            quantity : stock.quantity,
            date : stock.date,
            enableLowStockAlert : stock.enableLowStockAlert,
            lowStockAlertQuantity : stock.lowStockAlertQuantity,
        }
      };
      console.log(newBook);
  
      // Save the new book to the database
      const createdBook: IBook = await Book.create(newBook);
      res.json(createdBook);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract book data from request body
      const { name, image, category, code, description, price, stock } = req.body;
      const bookId = req.params.id;
  
      // Find the book to update
      const bookToUpdate: IBook | null = await Book.findById(bookId);
      if (!bookToUpdate) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      // Update the book document
      bookToUpdate.name = name;
      bookToUpdate.image = image;
      bookToUpdate.category = category;
      bookToUpdate.code = code;
      bookToUpdate.description = description;
      bookToUpdate.price = price;
      bookToUpdate.stock = stock;
  
      // Save the updated book to the database
      const updatedBook: IBook = await bookToUpdate.save();
      res.json(updatedBook);
    } catch (error) {
      next(error);
    }
  };


  //Detete a book
  export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const book_id = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(book_id);
      res.json({
        message : "Book deleted successfully",
      })
    }
    catch(error){
      next(error);
    }
  }