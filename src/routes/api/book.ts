import { Router } from "express";
import { createBook, deleteBook, fetchAllBooks, updateBook } from "../../controllers/booksController"

const router: Router = Router();

router.get("/", async (req, res ,next) => {
    //get all books
    let bookResponse = await fetchAllBooks(req, res,next);
    return bookResponse
    }
);

router.post("/", async (req, res, next) => {
    //create a new book
    let bookCreateResponse = await createBook(req, res,next);
    return bookCreateResponse
    }
);

router.put("/:id", async (req, res , next) => {
    //update a book
    let updateBookResponse = await updateBook(req, res,next);
    return updateBookResponse
});

router.delete("/:id", async (req, res , next) => {
    //delete a book
    let deleteBookResponse = await deleteBook(req, res,next);
    return deleteBookResponse
});

export default router;