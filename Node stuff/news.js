// Variables for connection
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "108.213.201.29",
    user: "root",
    password: "RazzleDazzle1!",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
});

con.connect(function(err) {
    if (err) throw err;
});

class news {
    constructor(news_key, img_name, title, link, news_description) {
        this.news_key = news_key;
        this.img_name = img_name;
        this.title = title;
        this.link = link;
        this.news_description = news_description;
    }

    getImageName() {
        return this.img_name;
    }

    updateImageName() {
        var imgName;
        con.query("SELECT IMG_Name FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                imgName = result[0].IMG_Name;
            })
        this.img_name = imgName;
    }

    getTitle() {
        return this.title;
    }

    updateTitle() {
        var news_title;
        con.query("SELECT Title FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                news_title = result[0].Title;
            })
        this.title = news_title;
    }

    getLink() {
        return this.link;
    }

    updateLink() {
        var news_link;
        con.query("SELECT Link FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                news_link = result[0].Link;
            })
        this.link = news_link;
    }

    getNewsDescription() {
        return this.news_description;
    }

    updateNewsDescription() {
        var description;
        con.query("SELECT News_Description FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                description = result[0].News_Description;
            })
        this.news_description = description;
    }
}

var PublicNews = () => {
    var public_news = [];
    con.query("SELECT * FROM News;", function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            public_news.push(new news(result[i].Key, result[i].IMG_Name,
                result[i].Title, result[i].Link, result[i].News_Description));
        }
    })
    return public_news;
}

con.end();