import React from 'react';

// utils
import {getHumanizedDate} from './utils/index';

const ONE_DAY = 24*60*60*1000;

class GridBody extends React.Component {

    state = {
      'roomType': 'oak'
    };

    handleChange = e => this.setState({roomType:e.target.value});

    renderDate = (val, i) => {
        const columnDate = new Date(this.props.startDate.getTime() + ONE_DAY*i);
        return <th>{getHumanizedDate(columnDate)}</th>;
    };

    renderTableHeads() {
        return (
            <thead>
                <tr>
                    <th>
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="oak">Oak</option>
                            <option value="maple">Maple</option>
                        </select>
                    </th>
                    {Array.from(Array(15), this.renderDate)}
                </tr>
            </thead>
        );
    }

    renderRoomBookings = (roomNo) => {
        const tds = [];
        const bookingInfo = this.props.data[this.state.roomType][roomNo+1];
        let j = 0;
        for(let i = 0;i < 15; i++) {
            let colSpan = 1, className = '', name = '';
            const date = new Date(this.props.startDate.getTime()+ONE_DAY*i);
            if(bookingInfo && j < bookingInfo.length && date.getTime() === bookingInfo[j].checkIn.getTime()) {
                className = 'isBooked';
                colSpan = bookingInfo[j].numberOfDays;
                name = bookingInfo[j].name;
                i= i + colSpan - 1;
                j++;
            }
            tds.push(<td className={className} colSpan={colSpan}><div>{name}</div></td>)
        }
        return tds;
    };

    renderRoom = (val, roomNo) => {
        const roomInfo = this.props.data[this.state.roomType];
        return (
          <tr key={`room-${roomNo}`}>
              <th>{roomNo + 1}</th>
              {this.renderRoomBookings(roomNo)}
          </tr>
      );
    };

    renderRooms() {
        return (
            <tbody>
                {Array.from(Array(6), this.renderRoom)}
            </tbody>
        );
    }

    render() {
        return (
            <table className={`bookingInfoTable bookingInfoTable--${this.props.direction}`}>
                {this.renderTableHeads()}
                {this.renderRooms()}
            </table>
        )
    }
}

export default GridBody;