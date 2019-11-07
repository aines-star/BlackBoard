var dateFormat = function(date){

    var newDate = new Date(date);
    var format = newDate.getDate() + '/' + (newDate.getMonth()+1+ '/' + newDate.getFullYear());
    return format

}

module.exports = dateFormat