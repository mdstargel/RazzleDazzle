import React from "react";
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
    const newsFeed = (
        newsArticles.map((data) => (
        <div style={{newsItem}}>
                <div style={newsImage}>{data.image}</div>
            <div style={newsTitleCenter}>{data.title}</div>
            <div style={NewsArticleText}>{data.description}</div>
        </div>
        ))
        
    );

    return (
        <div>
            <PageTitle name="News" />
            {newsFeed}
            <div style={{marginTop: '-190px', marginLeft: '1400px'}}>Right Button</div>
            <div>Left Button</div>

        </div>
    );
}

export default News;