import React, { useState } from "react";
import './styles.css'
import PageTitle from "./PageTitle";

const newsTitleCenter = {
    fontFamily: 'IBM Plex Sans Devanagari',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '37px',
    textAlign: 'center',
    color: '#0C1526',
}

const newsImage = {
    width: '650px',
    height: '296px',
    backgroundColor: 'green',
    marginTop: '192px',
    marginLeft: '450px',
}           

const newsItem = {
    width: '650px',
}

const NewsArticleText = {
    fontFamily: 'IBM Plex Sans Devanagari',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '23px',
    textAlign: 'center',
    color: '#000000',
}

const News = ({ newsArticles }) => {
    const [articleID, setArticleID] = useState(0);
    const SelectedFeedItem = () => {
        return (
            <a href={newsArticles[articleID].url} style={{ newsItem }}> 
                <div style={newsImage}>Center Feed Item{newsArticles[articleID].image}</div>
                <div style={newsTitleCenter}>{newsArticles[articleID].title}</div>
                <div style={NewsArticleText}>{newsArticles[articleID].description}</div>
            </a>
        );
    };

    const handleSetArticleLeft = () => {
        // We add newsArticles.length in order to prevent taking the mod of a negative number
        setArticleID( () => (articleID + newsArticles.length -1) % newsArticles.length)
    }
    const handleSetArticleRight = () => {
        setArticleID( () => (articleID + 1) % newsArticles.length);
    }

    const RightFeedItem = () => {
        const index = (articleID + 1) % newsArticles.length;
        return (
            <div>
                <div style={newsImage}>Right Feed Item{newsArticles[index].image}</div>
                <div style={newsTitleCenter}>{newsArticles[index].title}</div>
            </div>
        );
    }

    const LeftFeedItem = () => {
        const index = (articleID + newsArticles.length - 1) % newsArticles.length;
        return (
            <div>
                <div style={newsImage}>Left Feed Item{newsArticles[index].image}</div>
                <div style={newsTitleCenter}>{newsArticles[index].title}</div>
            </div>
        );
    }
    return (
        <div className="backGround">
            <PageTitle name="News" />
            <SelectedFeedItem />
            <RightFeedItem />
            <LeftFeedItem />
            <div onClick={handleSetArticleRight} style={{marginTop: '-190px', paddingLeft: '1400px'}}>Right Button</div>
            <div onClick={handleSetArticleLeft}>Left Button</div>

        </div>
    );
}

export default News;