const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Ensure axios is required

// Task 10: Get the list of books available in the shop using Promises
public_users.get('/', function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
        resolve(books);
    });

    getBooks.then((bookList) => {
        res.status(200).send(JSON.stringify(bookList, null, 4));
    });
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const getBookByISBN = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject({ message: "Book not found" });
        }
    });

    getBookByISBN
        .then((book) => res.status(200).send(JSON.stringify(book, null, 4)))
        .catch((err) => res.status(404).send(err.message));
});

// Task 12: Get book details based on Author using Promises
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const getBooksByAuthor = new Promise((resolve, reject) => {
        const filteredBooks = Object.values(books).filter(b => b.author === author);
        resolve(filteredBooks);
    });

    getBooksByAuthor.then((filtered) => res.status(200).send(JSON.stringify(filtered, null, 4)));
});

// Task 13: Get book details based on Title using Promises
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const getBooksByTitle = new Promise((resolve, reject) => {
        const filteredBooks = Object.values(books).filter(b => b.title === title);
        resolve(filteredBooks);
    });

    getBooksByTitle.then((filtered) => res.status(200).send(JSON.stringify(filtered, null, 4)));
});

module.exports.general = public_users;