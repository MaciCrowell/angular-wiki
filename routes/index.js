var express = require('express');
var async = require('async');
var path = require('path');
var Article = require('../models/articleModel.js');
var router = express.Router();

module.exports = router;

var homeGET = function(req, res) {
	res.sendFile(path.resolve('public/html/main.html'));
}

var articlesGET = function(req, res) {
	Article.find(function(err, articles) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(articles); // return all todos in JSON format
    });
}

var editArticlePOST = function(req, res) {
    console.log(req.body)
    Article.findById(req.body._id, function(err, todo) {
        todo.title = req.body.title;
        todo.introText = req.body.introText;
        todo.save(function (err, article) {
            if (err) return console.error(err)
            res.send(article);
        });
    });
}

var newArticlePOST = function(req, res) {
    console.log(req.body)
    // create a todo, information comes from AJAX request from Angular
    Article.create({
        title : req.body.title,
        introText: req.body.introText
    }, function(err, article) {
        if (err)
            return res.send(err);
        res.send(article)
    });

}



module.exports.home = homeGET;
module.exports.articles = articlesGET;
module.exports.editArticle = editArticlePOST;
module.exports.newArticle = newArticlePOST;