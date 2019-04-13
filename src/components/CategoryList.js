import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'


export default class CategoryList extends React.Component{
  render(){
    return(
      <StaticQuery
        query={graphql`
          query categoryQuery {
            allWordpressCategory {
              edges {
                node {
                  id
              		name
                  slug
                }
              }
            }
          }
        `}
        render={data => (
          <div>
            <h1>Categories.</h1>
            {data.allWordpressCategory.edges.map(({node}) => (
              <div key={`${node}cat`}>
                    <Link to={`/categories/${node.slug}/`}>
                        <p>{node.name}</p>
                    </Link>
              </div>
            ))}
          </div>
        )}
      />
    )
  }
}
