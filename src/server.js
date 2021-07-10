// Berkas ini berfungsi untuk memuat kode untuk membuat, mengonfigurasi, dan menjalankan server HTTP menggunakan Hapi

const Hapi = require('@hapi/hapi');

const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
          cors: {
            origin: ['*'],
          },
        },
      });

  server.route(routes);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();

// Untuk mengetahui penyebab error yang terjadi pada web app, dapat melihatnya melalui browser console dengan menekan CTRL + SHIFT + I dan akan terlihat pesan error

/*
// Tidak semua data bisa diambil dari origin yang berbeda mis. data JSON yang didapatkan melalui teknik XMLHTTPRequest atau fetch. Jika website meminta sesuatu menggunakan teknik tersebut dari luar origin-nya, maka permintaan tersebut akan ditolak. Itu disebabkan oleh kebijakan same-origin

// Origin terdiri dari tiga hal: protokol, host, dan port number. Origin dari aplikasi client kita adalah 'http://notesapp-v1.dicodingacademy.com'. Di mana protokolnya adalah http://, host-nya adalah notesapp-v1.dicodingacademy.com, dan port-nya adalah :80 (implisit).

// Penyebab gagalnya aplikasi client ketika melakukan permintaan ke web server yang kita buat adalah karena origin yang berbeda. Origin web server kita saat ini adalah http://localhost:5000/

// Solusinya adalah dengan menerapkan mekanisme Cross-origin resource sharing (CORS) agar keduanya dapat berinteraksi. Pada web server, kita hanya perlu memberikan nilai header ‘Access-Control-Allow-Origin’ dengan nilai origin luar yang akan mengkonsumsi datanya (aplikasi client) seperti,

const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
response.header('Access-Control-Allow-Origin', '*');
return response; // Tanda * pada nilai origin untuk memperbolehkan data dikonsumsi oleh seluruh origin
*/
