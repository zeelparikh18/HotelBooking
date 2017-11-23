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
const START_DATE = new Date('1-1-2017');
const END_DATE = new Date('1-14-2017');

export default class App extends React.Component {

    state = {
      'isFetching': true
    };

    componentWillMount() {
        httpGetAsync("http://www.mocky.io/v2/5a16a3d0310000a71d8d332e", (responseText) => {
            const data = sortAndGroupDataByRoomType(responseText);
            console.log(data);
            this.setState({
                data,
                isFetching: false
            });
        });
    }

    renderGridBody() {
        if(this.state.isFetching){
            return <Loader />;
        }
        return (
            <GridBody
                data={this.state.data}
                startDate={START_DATE}
                endDate={END_DATE}
            />
        );
    }

    render() {
        return (
            <div className="gridContainer">
                <Header />
                <div className="gridBody">
                    {this.renderGridBody()}
                </div>
            </div>
        );
    }
}