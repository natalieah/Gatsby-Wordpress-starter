import React from "react"
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../components/Layout.js'
import PageList from '../components/PageList.js'
import CategoryList from '../components/CategoryList.js'


class Main extends React.Component{
  render(){
    const data = this.props.data
    const githubURL = 'https://github.com/natalieah/Gatsby-Wordpress-starter.git'
    console.log(data)
    return(
      <Layout>
        <p>Hello, this here is a bare essentials Gatsby wordpress starter.
          Easily customizeable to your specific needs. Find it and try it out on <a href={githubURL}>Github!</a></p>
        <div>
              <h1>Posts.</h1>
              {data.allWordpressPost.edges.map(({node}) => (
                <div key={node.slug}>
                    <Link to={'/post/' + node.slug}>
                      <p>{node.title}</p>
                    </Link>
                </div>
              ))}
        </div>
        <PageList/>
        <CategoryList/>
      </Layout>
    )
  }
}

export default Main

export const pageQuery = graphql`
    query postsQuery{
        allWordpressPost {
            edges{
              node{
                id
                title
                slug
                date(formatString: "MMMM DD, YYYY")
              }
            }
        }
    }
`
