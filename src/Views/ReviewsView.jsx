import { useState, useEffect } from 'react'
import {apiMovReviews} from '../AppBar/API/API'

export default function ReviewsView({id}) {
    
const [review, setReview] = useState(null)

useEffect(()=>{
    apiMovReviews(id)
    .then(data=>setReview(data.data.results))
    

}, [])    

return (
    review && <ul className='review-list'>{
        
        review.length ? review.map((rev)=>{
           return <li key={rev.id}>
                <p className='autor'>nickname: <span className='span-autor'>{rev.author} </span></p>
                <p className='review'>{rev.content}</p>
            </li>
        })
       : <p>Sorry, no one review</p> 
        }</ul>
)
   
    
    
  
}
