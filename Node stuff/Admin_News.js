class admin_news {
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

    setImageName(imgName) {
        con.query("UPDATE News SET IMG_Name = '" + imgName + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
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

    setTitle(news_title) {
        con.query("UPDATE News SET Title = '" + news_title + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
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

    setLink(news_link) {
        con.query("UPDATE News SET Link = '" + news_link + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
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

    setNewsDescription(description) {
        con.query("UPDATE News SET IMG_Name = '" + description + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.news_description = description;
    }

    delete() {
        con.query("DELETE FROM News WHERE Key = " + this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
    }
}

module.exports = {
    admin_news: admin_news
}