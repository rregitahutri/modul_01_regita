const http = require("http");

const todos = [
    { id : 1, text: 'Todo One' },
    { id : 2, text: 'Todo Two' },
    { id : 3, text: 'Todo Three' },
];

const server = http.createServer((req, res) => {
  // console.log("Hello World");
  // const { headers, url, method } = req;
  // console.log('headers', headers);
  // console.log('url', url);
  // console.log('method', method);

  // res.end('Hallow, Im a human');

  //   res.setHeader("Content-type", "application/json");
  //   res.setHeader("X-Powered-By", "Node.js");

  //listening data from client
  const { method, url } = req;
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      //   console.log(body);

      let status = 404;
      const response = {
        success: false,
        results: [],
        error: "",
      };

      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.results = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = "Please add id and text";
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.results = todos;
        }
      }

      res.writeHead(status, {
        "Content-type": "application/json",
        "X-Powered-By": "Node.js",
      });

      res.end(JSON.stringify(response));
    });

  //   const data = JSON.stringify({
  //     success: true,
  //     error: "Not Found",
  //     data: null,
  //   });
});

const PORT = 5000;

//default address => localhost or 127.0.0.1
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
