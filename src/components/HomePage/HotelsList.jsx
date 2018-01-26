import React, { Component } from 'react';
import HotelCard from './HotelCard';

class HotelsList extends Component {
    render() {
        return (
            <div className="hotels-list-wrapper">
                {this.props.hotels.map(h=>(
                <HotelCard 
                    key={h.id}
                    id={h.id}
                    name={h.name}
                    location={h.location}
                    image={h.image}
                />
                ))}
            </div>
        );
    }
}

export default HotelsList;