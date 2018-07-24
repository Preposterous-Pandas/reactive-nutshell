import React, { Component } from 'react'
import Article from './News-Article'
import API from '../API/apiManager'
import styled from 'styled-components';
const snoowrap = require('snoowrap');


const Red = styled.div`
    background-color: white;
    color: cornflowerblue;
`


const Input = styled.input`
    display: block;
`
const CLIENT_ID = 'OK-5cj90Ys9FLw'
const CLIENT_SECRET = 'BBLPPl0d6e6fmMdSsQngD7pQlVI'
const REDDIT_USER = 'ConsecutiveNormalPun'
const REDDIT_PASS = 'Faithful1'
const r = new snoowrap({
    userAgent: 'Nutshell',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    username: REDDIT_USER,
    password: REDDIT_PASS
});
export default class News extends Component {
    state = {
        articles: [],
        newsTitle: "",
        newsBody: "",
        newsURL: "",
        showModal: false,
        reddit: []
    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });

    }

    componentDidMount() {
        API.getField("news?_sort=timestamp&_order=desc")
            .then(articles => this.setState({ articles: articles }))
        r.getHot().then(response => {
            this.setState({ reddit: response });
            console.log("reddit", this.state.reddit);
        })

        // console.log("reddit", this.state.reddit);



    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    checkInarticle = () => {
        API.postNews(sessionStorage.getItem("activeUser"), this.state.newsTitle, this.state.newsURL, this.state.newsBody, new Date)
            .then(result => {
                // console.log('news post result:', result);
                API.getField("news?_sort=timestamp&_order=desc")
                    .then(articles => this.setState({ articles: articles }))
                this.setState({ newsTitle: "" });
                this.setState({ newsBody: "" });
                this.setState({ newsURL: "" });

            })
    }

    checkInRarticle = (title, url, body) => {
        API.postNews(sessionStorage.getItem("activeUser"), title, url, body, new Date)
            .then(result => {
                // console.log('news post result:', result);
                API.getField("news?_sort=timestamp&_order=desc")
                    .then(articles => this.setState({ articles: articles }))
                this.setState({ newsTitle: "" });
                this.setState({ newsBody: "" });
                this.setState({ newsURL: "" });
                this.handleToggleModal();
            })
    }


    checkOutarticle = (articleId) => {
        // Delete the specified article from the API

        API.delNews(articleId)
            .then(() => {
                return API.getField("news?_sort=timestamp&_order=desc")
            })
            .then(articleList => {
                // console.log('check out articles list', articleList)
                this.setState({ articles: articleList });
            })
    }

    render() {
        // Printing a list of the titles on the front page
        return (
            <React.Fragment>
                <Red className="News">
                    <div className="News">
                        <h2>News</h2>
                        <label>Title</label>
                        <Input onChange={this.handleFieldChange} value={this.state.newsTitle} type="text" id="newsTitle" required /><br />
                        <label>Body</label>
                        <Input onChange={this.handleFieldChange} value={this.state.newsBody} type="text" id="newsBody" required /><br />
                        <label>URL</label>
                        <Input onChange={this.handleFieldChange} value={this.state.newsURL} type="text" id="newsURL" required /><br />
                        <button onClick={this.checkInarticle} id="add-article">New Article</button>
                        <button onClick={() => this.handleToggleModal()} id="add-Rarticle">Find Article</button>
                        {this.state.showModal &&
                            <div className="modal-div">
                                <div className="modal-content">
                                    <h2>Reddit Headlines</h2>
                                    {this.state.reddit.map(red => {
                                        return <h4 className="modal-content" key={red.title} onClick={() => this.checkInRarticle(red.title, red.url, red.preview.images[0].source.url)}>{red.title}</h4>
                                    })}
                                </div>
                                <button onClick={() => this.handleToggleModal()} id="x">X</button>
                            </div>
                        }

                        {
                            this.state.articles.map(article => {
                                return this.props.friends.concat([sessionStorage.getItem('activeUser')]).includes(`${article.userId}`) && <Article key={article.id}
                                    article={article}
                                    styling={sessionStorage.getItem('activeUser') == article.userId ? "normal" : "italics"}
                                    checkOutarticle={this.checkOutarticle}
                                />
                            }

                            )
                        }
                    </div>
                </Red>

            </React.Fragment>
        )
    }
}

