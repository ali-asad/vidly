// var xyz; file global
 module.exports = function (req , res , next) {
    if (!req.user.isAdmin) return res.status(403).send('Access Denied....'); //method chaining
    // var abc; function local
    next();
}

// (!req.user.isAdmin) nested properties
// isAdmin is a nested property in user json objectfd

//everything declared in a module in node is local. to use it somewhere else we need to export it.