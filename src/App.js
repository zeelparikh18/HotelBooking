import React from 'react';

// components
import Header from './Header';
import Loader from './Loader';
// import GridBody from ''

// styles
import './styles/main.scss';

export default class App extends React.Component {

    state = {
      'isFetching': true
    };

    render() {
        return (
            <div className="gridContainer">
                <Header />
                <div className="gridBody">
                    {this.state.isFetching ? <Loader/> : null}
                </div>
            </div>
        );
    }
}