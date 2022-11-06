import express from 'express';
import data from './data.js';
/*
    The "Error [ERR_MODULE_NOT_FOUND]: Cannot find module" 
    occurs when you set the type attribute to module 
    in your package.json file, but omit the file extension 
    when importing. To solve the error, specify the 
    extension when importing local files
*/

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000; // free port convention 혹은 임의의 포트번호
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
