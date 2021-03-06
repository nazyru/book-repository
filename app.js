const express = require('express');
const BooksRouter = require('./src/routes/BooksRoute');

const app = express();
//middlewares
app.use(express.json())

app.use('/books', BooksRouter);

if (require.main === module) {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

module.exports = app;