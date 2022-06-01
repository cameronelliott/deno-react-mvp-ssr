// frontend/ssr/server.tsx

import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
//import * as oak from "https://deno.land/x/oak@v10.6.0/mod.ts";

import { React, ReactDOMServer } from "./dep.ts";
import App from "./App.tsx";

const app = new Application();
const port = 8000;

const router = new Router();
router.get("/", (context) => {
  context.response.body = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sanity <-> Deno</title>
</head>
<body >
    <div id="root">${ReactDOMServer.renderToString(<App />)}
    </div>
</body>
</html>`;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port });
console.log(`server is running on port: ${port}`);
