const app = require('./app')


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is up and runing on port ${process.env.PORT}!`)
})


module.exports = app; 