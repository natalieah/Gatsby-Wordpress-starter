import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'

export default class PageList extends React.Component{
  render(){
    return(
      <StaticQuery
        query={graphql`
          query pageListQuery {
            allWordpressPage {
              edges {
                node{
                  title
                  slug
                }
              }
            }
          }
        `}
        render={data => (
          <div>
            <h1>Pages.</h1>
            {data.allWordpressPage.edges.map(({node}) => (
              <div key={node.slug}>
                    <Link to={'/' + node.slug}>
                      <p>{node.title}</p>
                    </Link>
              </div>
            ))}
          </div>
        )}
      />
    )
  }
}
