import React from 'react'
import { Link } from 'gatsby'

export default class Navbar extends React.Component{

  render(){
    return(
      <div>
        <Link to={'/'}>
          <h2>GATSBY WP</h2>
        </Link>
      </div>
    )
  }
}
