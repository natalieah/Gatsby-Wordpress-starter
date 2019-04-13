import React from "react"
import { Link } from 'gatsby'
import Cat from '../img/404_cat.gif'


class NotFoundPage extends React.Component{
  render(){
    return(
      <div>
        <img src={Cat} alt='Oops cat'/>
        <h1>Uh oh..</h1>
        <p>That's embarassing, seems like the page you're looking for does not exsist.</p>
          <Link to={'/'}>
            <p>Back to safety.</p>
          </Link>
      </div>
    )
  }
}

export default NotFoundPage
