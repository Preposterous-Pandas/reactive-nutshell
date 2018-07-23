import React from "react"
import Moment from 'react-moment';


export default props => {
    return (
        <div className={props.styling} style={{ width: `18rem` }}>
            <div className="card-body">
                <h5 className="card-title">
                    {props.article.title}
                </h5>
                {((/^(f|ht)tps?:\/\//i.test(props.article.synopsis))) ? <img src={`${props.article.synopsis}`} alt="an image" height="100" width="100" /> : <p className="card-content">{props.article.synopsis}</p>
                }
                <p className="card-content">{props.article.url}</p>
                <p className="card-content"><Moment>{props.article.timestamp}</Moment></p>

                <a href="#" onClick={() => props.checkOutarticle(props.article.id)}>Delete</a>
            </div>
        </div>
    )
}
