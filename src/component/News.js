import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps = {
  country:'in',
  pageSize:10,
  category:'general'

  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

  }
  capitalizedFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizedFirstLetter(this.props.category)} - Taaza Khabar`
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3e3a96577944ebb93c81d14a316ebec&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading : false })

  }
  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3e3a96577944ebb93c81d14a316ebec&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({loading : true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading : false
      })
    }
    
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3e3a96577944ebb93c81d14a316ebec&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading : false
    })
   
    
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:"35px 0px"}}>Taaza Khabar - Top Headline from {this.capitalizedFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
              <NewsItems title={element.title} description={element.description} ImgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News