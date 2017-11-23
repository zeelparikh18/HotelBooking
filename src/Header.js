import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="navigate" onClick={this.props.onClick}>
                    <div className="navigate--prev ">
                        <span className="left button" data-dir="prev"> &lang; </span>
                    </div>
                    <div className="navigate--next">
                        <span className="right button" data-dir="next"> &rang; </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;