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
    position: 'absolute',
    top: '700px',
    left: '50%',

}

const newsImage = {
    // backgroundImage: "url(./Assets/NewsPic1.jpg)",
    position: 'absolute',
    width: '600px',
    height: '400px',
    top: '300px',
    left: 'calc(50% - 300px)',
    borderRadius: '20px',
    // zIndex: '3',
    
    
    // position: absolute;
    // display: block;
    // left: calc(75% - 200px);
    // top: 40%;
    // border-radius: 20px;
    // border-style: 20px solid #0C1526;
    // width: 400px;
    // z-index: 3;
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
    position: 'absolute',
    top: '740px',
    left: '50%',
}

const rightsideItem = {
    width: '200px',
    height: '200px',
    // backgroundColor: 'green',
    top: '50%',
    left: 'calc(85% - 100px)',
    position: 'absolute',
    borderRadius: '20px',
}

const rightsideTitle = {
    top: '570px',
    left: 'calc(85% - 25px)',
    position: 'absolute',
}

const leftsideItem = {
    width: '200px',
    height: '200px',
    top: '50%',
    left: 'calc(15% - 100px)',
    position: 'absolute',
    borderRadius: '20px',
}

const leftsideTitle = {
    top: '570px',
    left: 'calc(15% - 25px)',
    position: 'absolute',
}

// Pic urls
// https://www.pexels.com/photo/man-riding-horse-across-river-9899966/
// https://www.pexels.com/photo/cowboy-riding-a-horse-on-the-river-9899960/
// https://www.pexels.com/photo/cowboy-during-a-rodeo-event-12950414/
// https://www.pexels.com/photo/man-riding-a-horse-7359364/
// https://www.pexels.com/photo/silhouette-of-man-riding-horse-on-sunset-13745126/
// https://www.pexels.com/photo/action-animal-bronco-bucking-33251/
// https://www.pexels.com/photo/boy-riding-horse-during-sunset-3856371/


const News = ({ newsArticles }) => {
    const [articleID, setArticleID] = useState(0);
    const SelectedFeedItem = () => {
        return (
            <a href={newsArticles[articleID].url} style={{ newsItem }}> 
                {/* <div style={newsImage}>Center Feed Item{newsArticles[articleID].image}</div> */}
                <div><img src={newsArticles[articleID].image} style={newsImage} alt="Female trainer1" /></div>
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
                {/* <div style={rightsideItem}>Right Feed Item{newsArticles[index].image}</div> */}
                <div><img src={newsArticles[index].image} style={rightsideItem} alt="Female trainer1" /></div>
                <div style={rightsideTitle}>{newsArticles[index].title}</div>
            </div>
        );
    }

    const LeftFeedItem = () => {
        const index = (articleID + newsArticles.length - 1) % newsArticles.length;
        return (
            <div>
                {/* <div style={leftsideItem}>Left Feed Item{newsArticles[index].image}</div> */}
                <div><img src={newsArticles[index].image} style={leftsideItem} alt="Female trainer1" /></div>
                <div style={leftsideTitle}>{newsArticles[index].title}</div>
            </div>
        );
    }
    return (
        <div >
            <PageTitle name="News" />
            <div>
                <SelectedFeedItem />
                <RightFeedItem />
                <LeftFeedItem />
                <div
                    onClick={handleSetArticleRight}
                    style={{ fontSize: '70px', position: 'absolute', marginTop: '350px', paddingLeft: '95%' }}>&#10148;</div>
                <div
                    onClick={handleSetArticleLeft}
                    style={{ transform: 'rotate(180deg)', fontSize: '70px', position: 'absolute', marginTop: '350px', paddingLeft: '2%' }}>&#10148;</div>
            </div>
        </div>
    );
}

export default News;