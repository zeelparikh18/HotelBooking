import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="navigate">
                    <div className="navigate--prev">
                        <span className="left button" id="prev"> &lang; </span>
                    </div>
                    <div className="navigate--next">
                        <span className="right button" id="next"> &rang; </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;