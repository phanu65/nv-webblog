const UserController = require('./controllers/UserController'); // Adjust the path as necessary

module.exports = (app) => {
    // Create user
    app.post('/user', UserController.create);
    // Update user
    app.put('/user/:userId', UserController.put);

    // Delete user
    app.delete('/user/:userId', UserController.remove);

    // Show user details
    app.get('/user/:userId', UserController.show);

    // List all users
    app.get('/user', UserController.index);
};