
const { Router } = require('express');
const { BookModel } = require('../model/book.model');

const bookRouter = Router()

bookRouter.get('/', async (req, res) => {

    let { Genre, Price } = req.query;

    let sortOrder;

    if (Price == 'asc') {

        sortOrder = 1;

    } else if (Price == 'desc') (

        sortOrder = -1
        
    )

try {

    Genre = new RegExp(Genre, 'i')

    let books;

    if (Price) {

        books = await BookModel.find({ Genre }).sort({ Price: sortOrder });

    } else {

        books = await BookModel.find({ Genre })

    }

    return res.status(200).send({
        isError: false,
        msg: 'Your Book Successfully Fetched',
        book: books
    })

} catch (error) {

    return res.status(400).send({
        isError: true,
        msg: error.message
    })

}
})


bookRouter.post('/add', async (req, res) => {

    try {

        const newBook = new BookModel(req.body)

        await newBook.save()

        return res.status(201).send({
            isError: false,
            msg: 'Your Book Successfully Added',
            book: newBook
        })


    } catch (error) {

        return res.status(400).send({
            isError: true,
            msg: error.message
        })

    }

})


bookRouter.delete('/delete/:id', async (req, res) => {

    const { id } = req.params;

    try {

        await BookModel.findByIdAndDelete({ _id: id })

        return res.status(201).send({
            isError: false,
            msg: 'Your Book Successfully Deleted'
        })


    } catch (error) {

        return res.status(400).send({
            isError: true,
            msg: error.message
        })

    }

})




module.exports = {
    bookRouter
}