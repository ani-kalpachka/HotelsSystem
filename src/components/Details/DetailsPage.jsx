import React, { Component } from 'react';
import { getDetails } from '../../api/remote';
import { Link } from 'react-router-dom';
import ReviewSection from './ReviewSection';

class DetailsPage extends Component {
    constructor (props) {
        super (props);

        this.state = {
            hotel: false
        };
    }

    componentDidMount() {
        this.getData();
    };

    async getData() {
        const hotel = await getDetails(Number(this.props.match.params.id));
        this.setState({hotel});
    };

    render () {
        let main = <p>Loading&hellip;</p>;
        
        if (this.state.hotel) {
            const hotel = this.state.hotel;

            main = (
                <div className="hotel-details">
                    <img alt={hotel.image} src={hotel.image} />
                    <h2>{hotel.name}</h2>
                    <h3>Location: {hotel.location}</h3>
                    <p>Description: {hotel.description}</p>
                    <p>Number of rooms: {hotel.numberOfRooms}</p>
                    <p>Parking Slots: {hotel.parkingSlots}</p>
                </div>
            );
        }

        return (
            <div className="container">
                <Link to={'/'} className="back-button">&larr; Archive</Link>
                <h1>Details Page</h1>
                { main }
                <ReviewSection hotelId={Number(this.props.match.params.id)}/>
            </div>
        )
    }
}

export default DetailsPage;