import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let { title, description, ImgUrl, newsUrl, author, date } = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img src={!ImgUrl?"https://cdn.vectorstock.com/i/1000x1000/75/83/404-error-page-not-found-plug-graphic-vector-19997583.webp":ImgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>

            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">show more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItems