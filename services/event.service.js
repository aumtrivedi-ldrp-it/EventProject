/**
event.service for manage all database related stuff
**/

const Event = require("../models/index").tbl_event //include database model
const arrDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];// for display weekdays
//Function for event creation
exports.addEventService = async ({ body }) => {
    let createEvent = await Event.create(body);
    return createEvent
}

//Function for find event 

exports.findEvent = async (request) => {
    return await Event.findOne({ where: { event_id: request.params.id } });
}

//Function for update event 

exports.updateEventService = async (request) => {
    let updateObj = {
        title: request.body.title && request.body.title,
        start_date: request.body.start_date && request.body.start_date,
        end_date: request.body.end_date && request.body.end_date,
        recurrence_every: request.body.recurrence_every && request.body.recurrence_every,
        recurrence_day: request.body.recurrence_day && request.body.recurrence_day,
    }

    return await Event.update(updateObj, { where: { event_id: request.params.id } })
}


//Function for listing event with pagination 
exports.listEvent = async (request) => {
    let offset = (request.body.page - 1) * 10;
    let limit = 10;
    return await Event.findAll({
        where: { is_deleted: false },
        offset: offset,
        limit: limit
    });
}

//Function for set event date  

exports.setEventDateService = async (findEvent) => {

    /** for getting every day related data */
    if (findEvent.dataValues.recurrence_every === "every" && findEvent.dataValues.recurrence_day === "day") {
        var daylist = getDaysArray(findEvent, 1);
        findEvent.dataValues.date = daylist
        return findEvent
    }
    if (findEvent.dataValues.recurrence_every === "every other" && findEvent.dataValues.recurrence_day === "day") {

        var daylist = getDaysArray(findEvent, 2);
        findEvent.dataValues.date = daylist
        return findEvent
    }
    if (findEvent.dataValues.recurrence_every === "every third" && findEvent.dataValues.recurrence_day === "day") {
        var daylist = getDaysArray(findEvent, 3);
        findEvent.dataValues.date = daylist
        return findEvent
    }

    if (findEvent.dataValues.recurrence_every === "every fourth" && findEvent.dataValues.recurrence_day === "day") {
        var daylist = getDaysArray(findEvent, 4);
        findEvent.dataValues.date = daylist
        return findEvent
    }

    /** for getting every week related data */

    if (findEvent.dataValues.recurrence_every === "every" && findEvent.dataValues.recurrence_day === "week") {
        var daylist = getWeekArray(findEvent, 7);
        findEvent.dataValues.date = daylist
        return findEvent
    }

    if (findEvent.dataValues.recurrence_every === "every other" && findEvent.dataValues.recurrence_day === "week") {
        var daylist = getWeekArray(findEvent, 7 * 2);
        findEvent.dataValues.date = daylist
        return findEvent
    }

    if (findEvent.dataValues.recurrence_every === "every third" && findEvent.dataValues.recurrence_day === "week") {
        var daylist = getWeekArray(findEvent, 7 * 3);
        findEvent.dataValues.date = daylist
        return findEvent
    }

    if (findEvent.dataValues.recurrence_every === "every fourth" && findEvent.dataValues.recurrence_day === "week") {
        var daylist = getWeekArray(findEvent, 7 * 4);
        findEvent.dataValues.date = daylist
        return findEvent
    }
}

//getting data between days 
var getDaysArray = function (findEvent, day) {
    let dateArr = []
    let start = new Date(findEvent.dataValues.start_date);
    let end = new Date(findEvent.dataValues.end_date);
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + day)) {
        arr.push(new Date(dt));
    }

    arr.map(result => {

        let dateObj = {
            date: result,
            day: arrDay[new Date(result).getDay()]
        };
        dateArr.push(dateObj)
    })
    return dateArr;
};


//getting data between week days 
var getWeekArray = function (findEvent, day) {
    let dateArr = []
    let start = new Date(findEvent.dataValues.start_date);
    let end = new Date(findEvent.dataValues.end_date);
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + day)) {
        arr.push(new Date(dt));
    }

    arr.map(result => {

        let dateObj = {
            date: result,
            day: arrDay[new Date(result).getDay()]
        };
        dateArr.push(dateObj)
    })
    return dateArr;
};