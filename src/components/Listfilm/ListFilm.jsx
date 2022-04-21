import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import image from '../../Image/image.png'

export default function ListFilm({ movies }) {
    const location = useLocation() 
  return (
    <ul className='film-list'>

                { movies && movies.map((mov)=>(
                    <li className='film-item' key={mov.id}>
                        <Link className='link-item' to={{
                                pathname: `/movies/${mov.id}`,
                                state: {from: location}
                            }}>
                        <img width="250" height="340" src={
                                    mov.poster_path
                                    ? `https://image.tmdb.org/t/p/w500/${mov.poster_path}` 
                                    : image } alt={mov.title} />
                        <h3 className='film-item-header'>{mov.title}</h3>
                        </Link>
                    </li>
                ))               
            }
            </ul>
  )
}
