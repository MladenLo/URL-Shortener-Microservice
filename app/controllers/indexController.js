//Importing model
var Url = require("../models/Url");

//Defining controller
var indexController = {};

//Adding controller methods
indexController.index = function(req, res) {
    res.render('index');
};
indexController.newUrl = function(req, res) {
    //I have found this regular expression https://gist.github.com/dperini/729294
    var myRegexp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if(myRegexp.test(req.params.url)) {
        Url.find().limit(1).sort({$natural:-1}).exec(function(err, foundUrl){
            if(err){
                res.send(err);
            } else {
                if(foundUrl){
                    var nextValue = foundUrl[0].unique_number + 1;
                } else {
                    var nextValue = 1;
                }
                var newUrl = {
                    unique_number: nextValue,
                    url: req.params.url,
                    short_url: "https://url-shortener-mladenlo.herokuapp.com/" + nextValue
                }
                new Url( newUrl ).save(function(err){
                    if(err){
                        res.send("Internal error. Please try again.");
                    } else {
                        var result = {
                            original_url: req.params.url,
                            short_url: newUrl.short_url
                        };
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(result));
                    }
                });
            }
        });
    } else {
        var result = {
            error: "Wrong url format, make sure you have a valid protocol and real site."
        };
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    }
};
indexController.redirectToUrl = function(req, res) {
    var myRegexp = /^\d+$/;
    if(myRegexp.test(req.params.url)){
        Url.find({unique_number: req.params.url}).exec(function(err, data){
            if(err){
                res.send("We have internal error");
            } else {
                if(data[0] == undefined){
                    res.send("This URL does not exist in our database");
                } else {
                    res.redirect(data[0].url);
                }
            }
        });
    } else {
        res.send("Bar format, try with numbers only");
    }
};

module.exports = indexController;
