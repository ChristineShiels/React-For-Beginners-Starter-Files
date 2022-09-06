import React from 'react';
import PropTypes from "prop-types";
import AddFishForm from './AddFishForm.js';
import EditFishForm from './EditFishForm.js';


class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadFishes: PropTypes.func,
        index: PropTypes.string
    }
    render(){
        return(
            <div className='inventory'>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                        index = {key}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadFishes} >Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;