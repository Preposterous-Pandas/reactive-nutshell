import React, { Component } from 'react'
import Article from './News-Article'
import API from '../API/apiManager'



export default class News extends Component {
    state = {
        articles: [],
        newsTitle: "",
        newsBody: "",
        newsURL: ""
    }

    componentDidMount() {
        API.getField("news")
            .then(articles => this.setState({ articles: articles }))
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    checkInarticle = () => {
        API.postNews(sessionStorage.getItem("activeUser"), this.state.newsTitle, this.state.newsURL, this.state.newsBody, Date.now())
            .then(result => {
                console.log('news post result:', result);
                API.getField("news")
                    .then(articles => this.setState({ articles: articles }))
                this.setState({ newsTitle: "" });
                this.setState({ newsBody: "" });
                this.setState({ newsURL: "" });

            })
    }


    checkOutarticle = (articleId) => {
        // Delete the specified article from the API

        API.delNews(articleId)
            .then(() => {
                return API.getField("news")
            })
            .then(articleList => {
                console.log('check out articles list', articleList)
                this.setState({ articles: articleList });
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="News">
                    <label>Title</label>
                    <input onChange={this.handleFieldChange} value={this.state.newsTitle} type="text" id="newsTitle" required/>
                    <label>Body</label>
                    <input onChange={this.handleFieldChange} value={this.state.newsBody} type="text" id="newsBody" required/>
                    <label>URL</label>
                    <input onChange={this.handleFieldChange} value={this.state.newsURL} type="text" id="newsURL" required/>
                    <button onClick={this.checkInarticle} id="add-article">New Article</button>


                    {
                        this.state.articles.map(article => {
                            return this.props.friends.concat([sessionStorage.getItem('activeUser')]).includes(`${article.userId}`) && <Article key={article.id}
                                article={article}
                                checkOutarticle={this.checkOutarticle}
                            />
                        }

                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}

