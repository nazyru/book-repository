const express = require('express');
const BooksRouter = require('./src/routes/BooksRoute');

const app = express();
//middlewares
app.use(express.json())

app.use('/books', BooksRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));