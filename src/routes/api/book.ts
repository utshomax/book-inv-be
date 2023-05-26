import { Router } from "express";
import { createBook, fetchAllBooks, updateBook } from "../../controllers/booksController"

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


export default router;