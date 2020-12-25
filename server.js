const { app, PORT } = require('./src/config/MainConfig');
const homeRouter = require('./src/routes/Home');
const userRouter = require('./src/routes/User');
const quotesRouter = require('./src/routes/Quotes');

app.listen(PORT, () => {
    console.log(`App listening to port: ${PORT}`);
});

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/quotes', quotesRouter);