const { nanoid } = require("nanoid"); //memanggil nanoID
const books = require("./books"); //merequire array books sebagai penyimpanan data

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload; //merequest isi body

  //jika nama buku kosong
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400); //respon status 400
    return response;
  }
  //jika read pagenya lebih besar dari page count
  else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } else {
    const id = nanoid(16); //panjang karakter id adalah 16
    const insertedAt = new Date().toISOString(); //membuat tanggal data
    const updatedAt = insertedAt;
    const finished = pageCount === readPage; //observasi data finished

    //isi objek bukunya
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    //memasukan data ke array books
    books.push(newBook);

    //memastikan bahwa buku sudah masuk (pake id)
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id, //data buku yang dimasukin berdasarkan id
        },
      });
      response.code(201); //respon code 201
      return response;
    }
  }
  //kalo gagal
  const response = h.response({
    status: "error",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500); //response code 500
  return response;
};

//mendapatkan isi buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  //jika namanya tidak kosong
  if (name !== undefined) {
    const BooksName = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())); //konversi string jadi huruf kecil supaya rapih
    const response = h.response({
      status: "success",
      data: {
        books: BooksName.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  //jika reading terisi
  else if (reading !== undefined) {
    const BooksReading = books.filter((book) => Number(book.reading) === Number(reading));

    const response = h.response({
      status: "success",
      data: {
        books: BooksReading.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  //jika finished terisi
  else if (finished !== undefined) {
    const BooksFinished = books.filter((book) => book.finished == finished);

    const response = h.response({
      status: "success",
      data: {
        books: BooksFinished.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "success",
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
};
//mendapatkan isi buku dari id spesifik
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((b) => b.id === id)[0];
  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

//mengedit isi buku berdasarkan id spesifik
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload; //merequest body

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);
  //jika nama buku ga diisi maka akan fail
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  //jika read pagenya lebih besar dari page count
  else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  //jika indexnya ketemu
  else if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    //jika berhasil
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  } else {
    //jika gagal
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

//menghapus buku berdasarkan id spesifik
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);
  //jika idnya ketemu
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  //jika idnya ga ketemu
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

//mengexports semua handler diatas dengan literal
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
