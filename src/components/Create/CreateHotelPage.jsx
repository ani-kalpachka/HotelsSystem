import React, { Component } from 'react';
import Input from '../common/Input';
import { createHotel } from '../../api/remote';
import { withRouter } from 'react-router-dom';

class CreateHotelPage extends Component {
    constructor (props) {
        super (props);

        this.state = {
            name: '', 
            location: '',
            description: '', 
            numberOfRooms: '',
            image: '',
            parkingSlots: '',
            error: false,
            submitting: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        this.setState({submitting: true});

        const hotel = {
            name: this.state.name, 
            location: this.state.location, 
            description: this.state.description, 
            numberOfRooms: Number(this.state.numberOfRooms), 
            image: this.state.image, 
            parkingSlots: Number(this.state.parkingSlots)
        };

        const error = { message: '', errors: {} }; 

        if (hotel.description.length < 10) {
            error.message = 'Check the form for errors.';
            error.errors.description = 'Description must be more than 10 symbols.'
        }

        if (isNaN(hotel.numberOfRooms || hotel.numberOfRooms <= 0)) {
            error.message = 'Check the form for errors.';
            error.errors.numberOfRooms = 'Number of rooms must be a positive number.'
        }

        if (error.message) {
            this.setState({ error, submitting: false });
            return;
        }

        this.setState({error: false});
        const res = await createHotel(hotel);

        if (!res.success) {
            this.setState({error: res, submitting: false });
            return;
        }

        this.setState({ submitting: false });
        this.props.history.push('/');
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
            <div>
                <h2>Create new Hotel:</h2>
                { errors }
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="location"
                        value={this.state.location}
                        onChange={this.onChangeHandler}
                        label="Location"
                    />
                    <Input
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                        label="Description"
                    />
                    <Input
                        name="numberOfRooms"
                        type="number"
                        value={this.state.numberOfRooms}
                        onChange={this.onChangeHandler}
                        label="Number of Rooms"
                    />
                    <Input
                        name="image"
                        value={this.state.image}
                        onChange={this.onChangeHandler}
                        label="Image"
                    />
                    <Input
                        name="parkingSlots"
                        type="number"
                        value={this.state.parkingSlots}
                        onChange={this.onChangeHandler}
                        label="Parking Slots"
                    />
                    <input type="submit" value="Create" disabled={this.state.submitting} />
                </form>
            </div>
        )
    }
}

export default withRouter(CreateHotelPage);