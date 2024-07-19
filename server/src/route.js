const UserController = require('./controller/UserController')

module.exports = (app) => {
    //create user
    app.post('/user',
        UserController.create
    )
    app.put('/user/:userId',
        UserController.put
    )
    app.delete('/user/:userId',
        UserController.delete
    )
    app.show('/user/:userId',
        UserController.show
    )
    app.get('/user',
        UserController.index
    )

}