import React from 'react'
import PrimaryButton from "./PrimaryButton";
import { FaPhone } from 'react-icons/fa';

const formatPhoneNumber = (phoneNumber) => {
    let newPhoneNumber = phoneNumber.match(/[0-9]{0,14}/g);
    if (newPhoneNumber === null) {
        return '';
    }

    newPhoneNumber = newPhoneNumber.join('')
    return newPhoneNumber
};

const CallButton = class extends PrimaryButton {
    render() {
        return (
            <a
                href={'tel:'+formatPhoneNumber(this.props.phoneNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-yellow"
                title={this.props.title}
            >
                <FaPhone/> Call Now: <span className="phone-number">{this.props.phoneNumber}</span>
            </a>
        )
    }
}

export default CallButton
