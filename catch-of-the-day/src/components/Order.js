import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        order: PropTypes.object,
        deleteFromOrder: PropTypes.func
    }
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // Make sure fish have loaded
        if( !fish ) return null;
        const isAvailable = fish && fish.status === 'available';

        if(!isAvailable) {
            return (
            <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
                <li key={key}>
                    Sorry {fish ? fish.name : 'fish'} is no longer available
                    <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
                </li>
            </CSSTransition>
            );
        }
        return (
            <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                         lbs {fish.name}

                        {formatPrice(count * fish.price)}

                        <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        );
    }

    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return(
            <div className='order-wrap'>
                <h2>Order</h2>
                <TransitionGroup component="ul" className='order'>
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className='total'>
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order;