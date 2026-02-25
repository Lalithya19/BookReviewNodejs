const axios = require("axios");

// Task 10: Get the book list available in the shop using Promises
public_users.get("/", function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    resolve(books);
  });
  getBooks.then((bookList) => {
    res.status(200).send(JSON.stringify(bookList, null, 4));
  });
});

// Task 11 (ISBN) - Using Promises
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const getBook = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({ status: 404, message: "Book not found" });
    }
  });
  getBook
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(err.status).json({ message: err.message }));
});

// Task 12: Get book details based on author using Async/Await
public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author;
  try {
    const getByAuthor = await new Promise((resolve) => {
      let filteredBooks = Object.values(books).filter(
        (b) => b.author === author,
      );
      resolve(filteredBooks);
    });
    res.status(200).send(JSON.stringify(getByAuthor, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 13: Get book details based on title using Async/Await
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title;
  try {
    const getByTitle = await new Promise((resolve) => {
      let filteredBooks = Object.values(books).filter((b) => b.title === title);
      resolve(filteredBooks);
    });
    res.status(200).send(JSON.stringify(getByTitle, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});
