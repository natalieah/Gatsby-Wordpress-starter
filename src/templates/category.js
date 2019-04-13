import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout.js'

class categoriesTemplate extends React.Component {
  render(){
    const posts = this.props.data.allWordpressPost.edges
    const postList = posts.map(post => (
      <div key={post.node.slug}>
        <Link to={'/post/' + post.node.slug}>
          <p>{post.node.title}</p>
        </Link>
      </div>
    ))
    const category = this.props.pageContext.name

    return(
      <Layout>
        <h1>Category: {category}</h1>
        <p>{postList}</p>
      </Layout>
    )
  }
}

export default categoriesTemplate


export const pageQuery = graphql`
query CategoryPage($slug: String!) {
site {
  siteMetadata {
    title
  }
}
allWordpressPost(filter: {categories: {elemMatch: {slug:{eq: $slug}}}}) {
  edges {
    node {
      id
      title
      excerpt
      content
      slug
      date(formatString: "MMMM DD, YYYY")
      featured_media{
        source_url
      }
      categories{
        name
      }
    }
  }
}
}

`
