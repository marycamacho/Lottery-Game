/**
 * Created by mary on 4/16/2016.
 */
/*
function getData(){
    var dailyDataString = localStorage.getItem('dailyData');

    if (dailyDataString) {
        var data = JSON.parse(dailyDataString);
        data.dateStored =  data.dateStored || new Date();
        return data;
    } else {
        return {
            dateStored: new Date()
        };
    }
}

function saveData(data){
    data.dateStored = new Date();
    if (window.localStorage){
        var dataString = JSON.stringify(data);
        console.log(dataString);
        localStorage.setItem('dailyData',dataString);
    } else {
        alert('Local Storage not Supported');
    }
}

function resetData () {
    var data={
        dateStored: new Date()
    };
    saveData(data);
    return data;
}
*/


