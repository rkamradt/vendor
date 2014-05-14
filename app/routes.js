var home = require('../controllers/home'),
    users = require('../controllers/users');
    items = require('../controllers/items');

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/api/users', users.index);
    app.get('/api/users/:id', users.getById);
    app.post('/api/users', users.add);
    app.put('/api/users', users.update);
    app.delete('/api/items/:id', items.delete);
    app.get('/api/items', items.index);
    app.get('/api/items/:id', items.getById);
    app.post('/api/items', items.add);
    app.put('/api/items', items.update);
    app.delete('/api/items/:id', items.delete);
};
