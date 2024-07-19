module.exports = {
    // get all user 
    index(req, res) {
        res.send('All Users');
    },

    create(req, res) {
        res.send('User Details: ' + req.params.userId);
    },

    put(req, res) {
        res.send('User Created: ' + JSON.stringify(req.body));
    },

    show(req, res) {
        res.send('User Updated: ' + req.params.userId + ' with data: ' + JSON.stringify(req.body));
    },

    remove(req, res) {
        res.send('User Deleted: ' + req.params.userId);
    },
}