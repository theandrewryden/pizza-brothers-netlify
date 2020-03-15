import React from 'react'

const PrimaryButton = class extends React.Component {
    render() {
        return (
            <button
                className="button order-online"
                title={this.props.title}
                onClick={() => {
                    if (this.props.url) {
                        window.location.href = this.props.url;
                    } else if(this.props.clickHandler) {
                        this.props.clickHandler();
                    }
                }}>
                {this.props.title}
            </button>
        )
    }
}

export default PrimaryButton
