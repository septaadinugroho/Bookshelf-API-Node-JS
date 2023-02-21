const Hapi = require("@hapi/hapi"); //memanggil hapi framework
const routes = require("./routes"); //memanggil isi routes

//konigurasinya
const init = async () => {
  const server = Hapi.server({
    port: 9000, //port 9000
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], //agar privacy policynya jadi secure
      },
    },
  });

  server.route(routes); //menjalankan routes

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`); //informasi port server pas dijalanin
};

init();
