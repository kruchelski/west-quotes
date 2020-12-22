const { app, PORT } = require('./src/configs/MainConfig');
const homeRouter = require('./src/routes/Home');
const loginRouter = require('./src/routes/Login');
const quotesRouter = require('./src/routes/Quotes');
const registerRouter = require('./src/routes/Register');

app.listen(PORT, () => {
    console.log(`App listening to port: ${PORT}`);
});

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/quotes', quotesRouter);
app.use('/register', registerRouter);