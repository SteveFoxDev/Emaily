import { Component } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { connect } from "react-redux";
import * as actions from '../actions/index.js';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
                name='Emaily'
                description='$5 for 5 credits'
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey='pk_test_51PnSwpRoE5CofNle9Hig6jspQNNrCpRxHvVHyaxrQ14IGxtT0KdG5I3hmij5LiHdoJtGdui5SU0fQDT3eTxmVYDX00zE0GErJJ'
            >
                <button className='btn blue-grey lighten-3'>Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);