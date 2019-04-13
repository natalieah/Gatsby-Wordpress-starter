import React from 'react'
import Navbar from '../components/Navbar'

import './layout.css'

const Wrapper = ({ children }) => (
  <div>
    <Navbar />
    <div>{children}</div>
  </div>
)

export default Wrapper
