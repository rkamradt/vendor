module.exports = {
    index: function(req, res) {
        console.log("home index: " + req.body);
        res.render('index');
    }
};
