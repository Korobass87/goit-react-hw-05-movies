import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navigation.css"

export default function Navigation() {
  return (
    <nav className='navigation'>
        <NavLink className="link-nav" activeClassName="active-link-nav" exact to="/">HOME</NavLink>
        <NavLink className="link-nav" activeClassName="active-link-nav" to="/movies">MOVIES</NavLink>
    </nav>
  )
}
