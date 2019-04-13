import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout.js'

class tagsTemplate extends React.Component {
  render(){
    const posts = this.props.data.allWordpressPost.edges
    const postList = posts.map(post => (
      <div key={post.node.slug}>
        <Link to={'/post/' + post.node.slug}>
          <p>{post.node.title}</p>
        </Link>
      </div>
    ))
    const tag = this.props.pageContext.name

    return(
      <Layout>
        <h1>Tag: {tag}</h1>
        <p>{postList}</p>
      </Layout>
    )
  }
}

export default tagsTemplate


export const pageQuery = graphql`
query TagPage($slug: String!) {
site {
  siteMetadata {
    title
  }
}

allWordpressPost(filter: {tags: {elemMatch: {slug:{eq: $slug}}}}) {
  edges {
    node {
      id
      title
      excerpt
      slug
      date(formatString: "MMMM DD, YYYY")
      featured_media{
        source_url
      }
      categories{
        name
      }
      tags{
        name
      }
    }
  }
}
}

`
