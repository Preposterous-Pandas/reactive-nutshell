import React from "react"


export default props => {
    return (
        <div className="card" style={{ width: `18rem` }}>
            <div className="card-body">
                <h5 className="card-title">
                    {props.article.title}
                </h5>
                <p className="card-body">{props.article.synopsis}</p>
                <p classname="card-body">{props.article.url}</p>
                <p classname="card-body">{props.article.timestamp}</p>

                <a href="#" onClick={() => props.checkOutArticle(props.article.id)}>Delete</a>
            </div>
        </div>
    )
}
