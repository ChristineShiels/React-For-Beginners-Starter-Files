import React, { Fragment } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
// instead of arrow function
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    myInput = React.createRef();

    goToStore = (e) => {
        e.preventDefault();
        // get text from input
        const storeName = this.myInput.current.value;
        // add input text to url
        this.props.history.push(`/store/${storeName}`)
    }

    render() {
        return (
            <Fragment>
                <form className='store-selector' onSubmit={this.goToStore} >
                    { /* This is how to comment in jsx */ }
                    <h2>Please Enter A Store Name</h2>
                    <input type='text' ref={this.myInput} required placeholder='Store Name' defaultValue={ getFunName() } />
                    <button type='submit'>Visit Store →</button>
                </form>
            </Fragment>
        )
    }
}

export default StorePicker;