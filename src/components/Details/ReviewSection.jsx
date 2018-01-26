import React, { Component } from 'react';
import { postReview, getReviews } from '../../api/remote';
import Review from './Review';

class ReviewSection extends Component {
    constructor (props) {
        super (props);

        this.state = {
            rating: 5,
            comment: '',
            reviews: [],
            error: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData () {
        const reviews = await getReviews(this.props.hotelId);
        this.setState({reviews});
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const res = await postReview(this.props.hotelId, this.state.comment, Number(this.state.rating));
        
        if (!res.success) {
            this.setState({ error: res });
            return;
        }

        const reviews = this.state.reviews.slice(); //returns a copy
        reviews.push(res.review);
        this.setState({reviews});
        this.getData();
    }

    render () {
        let errors = null;

        if (this.state.error) {
            errors = (
                <div>
                    <h3>{this.state.error.message}</h3>
                    {
                        Object.keys(this.state.error.errors).map(k => {
                            return <p className="validation-errors" key={k}>{this.state.error.errors[k]}</p>;
                        })
                    }
                </div>
            )
        }

        return (
            <div id="reviews">
                <form onSubmit = { this.onSubmitHandler }>
                    <h2>Leave a Review</h2>
                    { errors }
                    <div>
                        <h3>Rating:</h3>
                        <select name="rating" value = {this.state.rating} onChange = {this.onChangeHandler}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="comment">
                        <h3>Comment:</h3>
                        <textarea 
                            name="comment" 
                            value = {this.state.comment}
                            onChange = {this.onChangeHandler}
                        />
                        <input className="postReviewButton" type="submit" value="Post Review" />
                    </div>
                </form>
                <div className="reviews-block">
                    <h3>Reviews:</h3>
                    {this.state.reviews.map(r => (
                        <Review 
                            key={r.createdOn} 
                            user={r.user} 
                            comment={r.comment}
                            rating={r.rating} 
                            date={r.createdOn}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default ReviewSection;