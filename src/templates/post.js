import React, { Component } from "react"
import Layout from '../components/Layout.js'
import { graphql } from 'gatsby'

class PostTemplate extends Component {
    render() {
        const post = this.props.data.wordpressPost
        return (
          <Layout>
            <div>
                    <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
                    <p dangerouslySetInnerHTML={{ __html: post.date }} />
                    {post.featured_media &&
                      <div>
                       <img src={post.featured_media.source_url} alt='featured media'/>
                       </div>
                     }
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </Layout>
        )
    }
}
export default PostTemplate

export const pageQuery = graphql`
    query currentPostQuery($id: String!) {
        wordpressPost(id: { eq: $id }) {
            title
            content
            slug
            date(formatString: "MMMM DD, YYYY")
            featured_media {
              source_url
            }
            categories{
              name
              slug
            }
        }
        site {
            siteMetadata {
                title
                subtitle
            }
        }
    }
`
