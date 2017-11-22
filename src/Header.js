import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="navigate">
                    <div className="navigate--prev"></div>
                    <div className="navigate--next"></div>
                </div>
            </div>
        );
    }
}

export default Header;