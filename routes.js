//merequire handler.js
const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require("./handler");

//isi routes
const routes = [
  {
    //menambahkan buku
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    //mendapatkan isi buku
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    //mendapatkan isi buku berdasarkan id
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },
  {
    //edit buku berdasarkan id
    method: "PUT",
    path: "/books/{id}",
    handler: editBookByIdHandler,
  },
  {
    //menghapus buku berdasarkan id
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookByIdHandler,
  },
];

//exports isi routes
module.exports = routes;
