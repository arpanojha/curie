

import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import uploadRouter from "./router.js";
const app = express();
 


app.get('/', (_, res) => {
  res.sendFile(__dirname+"/index.html");
});
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadRouter);
 
app.listen(8080, () => {
  console.log('Form running on port 8080');
});