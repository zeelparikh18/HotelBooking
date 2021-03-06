import React from 'react';

// components
import Header from './Header';
import Loader from './Loader';
import GridBody from './GridBody';

// utils
import {
    httpGetAsync,
    sortAndGroupDataByRoomType,
} from './utils/index';

// styles
import './styles/main.scss';

// constants
const START_DATE = new Date(2017, 0, 1);
const MOCK_API = "http://www.mocky.io/v2/5a16a3d0310000a71d8d332e";

export default class App extends React.Component {

    state = {
        'isFetching': true,
        'data': {},
        'direction': ''
    };

    componentWillMount() {
        httpGetAsync(MOCK_API, (responseText) => {
            this.setState({
                data: sortAndGroupDataByRoomType(responseText),
                isFetching: false
            });
        });
    }

    handleArrowClick = e => {
        const direction = e.target.dataset.dir;
        this.setState({direction});
    };

    renderGridBody() {
        if(this.state.isFetching){
            return <Loader />;
        }
        return (
            <GridBody
                data={this.state.data}
                startDate={START_DATE}
                direction={this.state.direction}
            />
        );
    }

    render() {
        return (
            <div className="gridContainer">
                <Header onClick={this.handleArrowClick} />
                <div className="gridBody">
                    {this.renderGridBody()}
                </div>
            </div>
        );
    }
}