import React from 'react';
import Header from './Header.js';
import Inventory from './Inventory.js';
import Order from './Order.js';
import sampleFishes from '../sample-fishes.js';
import Fish from './Fish.js';
import base from '../base.js';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };

    // load fishes in firebase data
    componentDidMount() {
        const { params } = this.props.match;
        // first re-instate local storage (order)
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    // store order data in local (browser) storage
    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    // Clean up when you're done to prevent memory leaks
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }


    addFish = (fish) => {
        // copy existing state - no mutations!
        const fishes = {...this.state.fishes};
        // add new fish
        fishes[`fish${Date.now()}`] = fish;
        // set new fish to state
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        // take a copy of the fishes
        const fishes = { ...this.state.fishes };
        // update the state
        fishes[key] = updatedFish;
        // set to state
        this.setState({
            fishes:fishes
        });
    };

    deleteFish = (key) => {
        // take a copy of state.
        const fishes = { ...this.state.fishes };
        // updarte the state in firebase
        fishes[key] = null;
        // update the state in react
        this.setState({
            fishes: fishes
        });
    }

    loadFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    };

    addToOrder = (key) => {
        // copy state
        const order = {...this.state.order};
        // add to or update qty to order
        order[key] = order[key]+1 || 1;
        // update staye
        this.setState({order});
    };

    deleteFromOrder = (key) => {
        // copy state
        const order = {...this.state.order};
        // remove from order (not in firebase, in local storage)
        delete order[key];
        // update staye
        this.setState({order});
    }

    render(){
        return(
            <div className='catch-of-the-day'>
                <div className='menu'>
                    <Header tagline="The Fishiest Fish" />
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => <Fish 
                            key={key}
                            index = {key}
                            details={this.state.fishes[key]}
                            addToOrder={this.addToOrder}
                        />)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes}
                    order={this.state.order}
                    deleteFromOrder={this.deleteFromOrder}
                    />
                <Inventory 
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadFishes={this.loadFishes}
                    fishes={this.state.fishes}
                />
            </div>
        );
    }
}
export default App;

