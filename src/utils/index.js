const ONE_DAY = 24*60*60*1000; // hours*minutes*seconds*milliseconds
const NUMBER_TO_DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getNumberOfDays = (from, to) => Math.round(Math.abs((from.getTime() - to.getTime())/(ONE_DAY))) + 1;

const getDateInStandardFormat = dateString => {
  const [day, month, year] = dateString.split('-');
  return new Date([+year, +month, +day]);
};

const getDateString = dateObj => {
    const date = dateObj.getDate();
};

export const getHumanizedDate = dateObj => `${dateObj.getDate()} ${NUMBER_TO_DAY[dateObj.getDay()]}`;

const normalizeRoomData = data => {
    const checkInDate = getDateInStandardFormat(data.checkIn);
    const checkOutDate = getDateInStandardFormat(data.checkOut);
    return {
        id: data.id,
        roomType: data.roomType,
        roomNumber: data.roomNumber,
        name: data.name,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numberOfDays: getNumberOfDays(checkInDate, checkOutDate)
    };
};

const sortByDate = (a,b) => a.checkIn.getTime() - b.checkIn.getTime();

export const sortAndGroupDataByRoomType = data => {

    return data
        .map(normalizeRoomData) // convert dateString to Date object and add info like number of days in booking
        .sort(sortByDate) // sort the array in ascending order of checkin dates
        .reduce((obj, roomDetails) => { // group data by roomType and roomNumber.
            const {roomType, roomNumber} = roomDetails;

            if(!obj[roomType]){
                obj[roomType] = {};
            }
            if(!obj[roomType][roomNumber]){
                obj[roomType][roomNumber] = [];
            }

            obj[roomType][roomNumber].push(roomDetails);
            return obj;
        }, {});
};

export const httpGetAsync = (theUrl, callback) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};
