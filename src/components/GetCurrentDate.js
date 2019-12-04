
export const  ShowCurrentDate=()=>{

    let  date = new Date().getDate();
    // let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    // let day=new Date().getDay();
    let days = ['Sun','Mon','Tue','Wed','Thurs','Fri','Sat'];
    let months = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    let day = days[ new Date().getDay() ];
    let month = months[ new Date().getMonth() + 1 ];
    let monthName='';
    switch (month) {
        case 1: monthName='Jan';
        break;
        case 2: monthName='Feb';
            break;
        case 3: monthName='March';
            break;
        case 4: monthName='Apr';
            break;
        case 5: monthName='May';
            break;
        case 6: monthName='June';
            break;
        case 7: monthName='July';
            break;
        case 8: monthName='Aug';
            break;
        case 9: monthName='Sep';
            break;

        case 10: monthName='Oct';
            break;
        case 11: monthName='Nov';
            break;
        default : monthName='Dec';
            break;


    }

    return (day+' '+date + ' '+monthName + ' ' + year)

}



export const getTimeFromDate=(timestamp)=> {
    let  date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let  ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;



}
