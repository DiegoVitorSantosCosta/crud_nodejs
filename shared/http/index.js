
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const routes = require('../routes/index');
const bancoKnex = require('../../knex');
const AppError = require('../erros/AppError');
// errors celebrate
const errors = require('celebrate');
const celebrate = require('celebrate');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors.errors());

app.use((err, req, res, next) => {
    app.use(express.limit('50mb'));

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({ error: err.message });

})

app.listen(port, () => {
    console.log('Server is running on port 3000');
});