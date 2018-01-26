import React from 'react';

function Review ({comment, rating, user, date}) {
    return (
        <article>
            <header>{user} - {rating} stars </header>
            <p>{comment}</p>
            <footer>posted on <span className="date">{date}</span></footer>
        </article>
    )
}

export default Review;