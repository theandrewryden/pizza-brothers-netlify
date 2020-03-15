import React from 'react'
import PrimaryButton from "./PrimaryButton";
import { FaPhone } from 'react-icons/fa';

const CallButton = class extends PrimaryButton {
    render() {
        return (
            <button
                className="button call"
                title={this.props.title}
                onClick={() => {
                    if (this.props.phoneNumber) {
                        window.open('tel:'+this.props.phoneNumber);
                    }
                }}>
                <FaPhone/> Call Now: <span className="phone-number">{this.props.phoneNumber}</span>
            </button>
        )
    }
}

export default CallButton
