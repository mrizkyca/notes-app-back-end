// Berkas ini berfungsi untuk memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes

const { nanoid } = require('nanoid');

const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16); // Nilai dari id harus unik (perlu bantuan library pihak ketiga untuk mengatasinya yaitu nanoid yang menerima parameter number yang merupakan ukuran dari string-nya)

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    // Nilai dari properti createdAt dan updatedAt seharusnya sama sehingga perlu bantuan 'new Date().toISOString()' dalam memberikan nilainya

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote); // Masukkan nilai-nilai tersebut ke dalam array notes menggunakan method push()

    const isSuccess = notes.filter((note) => note.id === id).length > 0; // Mengecek apakah newNote sudah masuk ke dalam array notes dengan memanfaatkan method filter() berdasarkan id catatan

    // Jika isSuccess bernilai true, maka beri respons berhasil. Jika false, maka beri respons gagal
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
      }

        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        });
        response.code(500);
        return response;
    };

const getAllNotesHandler = () => ({ // Parameter request dan h tidak digunakan
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0]; // Mendapatkan objek note dengan id tertentu dari objek array notes

    // Kembalikan fungsi handler dengan data beserta objek note di dalamnya. Namun sebelum itu, pastikan dulu objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal.
    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note,
          },
        };
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload; // Mendapatkan data notes terbaru yang dikirimkan oleh client melalui body request.

    // Selain itu, tentu kita perlu perbarui juga nilai dari properti updatedAt. Jadi, dapatkan nilai terbaru dengan menggunakan new Date().toISOString().
    const updatedAt = new Date().toISOString();

    /* 
    Mengubah catatan lama dengan data terbaru memanfaatkan indexing array. Dapatkan index array pada objek catatan sesuai id yang ditentukan dengan findIndex()
    */
    const index = notes.findIndex((note) => note.id === id);

    // Bila note dengan id yang dicari ditemukan, maka index akan bernilai array index dari objek catatan yang dicari. Namun bila tidak ditemukan, maka index bernilai -1. Jadi, kita bisa menentukan gagal atau tidaknya permintaan dari nilai index menggunakan if else

    if (index !== -1) {
        notes[index] = {
          ...notes[index],
          title,
          tags,
          body,
          updatedAt,
        };
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
      response.code(404);
      return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id); // Menghapus catatan berdasarkan id dengan memanfaatkan index
    
    /*
    Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 bila hendak menghapus catatan. Nah, untuk menghapus data pada array berdasarkan index, gunakan method array splice()
    */ 
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
      }

    // Bila index bernilai -1, maka kembalikan handler dengan respons gagal
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler, };