/**
event.controller for manage all request and response related stuff
**/

const eventService = require("../services/event.service");
const STATUS = require("../helper/status").STATUS
const responseHandler = require("../helper/response.handler").responseHandler;

//for adding particular event
exports.addEvent = async (request, response) => {
    try {
        let createEventRes = await eventService.addEventService(request);
        responseHandler(response, STATUS.SUCCESSSTATUS, createEventRes, STATUS.SUCCESS, "Event created successfully");
    } catch (error) {
        responseHandler(response, STATUS.INTERNALSERVERSTATUS, error, STATUS.ERROR, "Internal server error");
    }
}
//for update particular event

exports.editEvent = async (request, response) => {
    try {
        let findEvent = await eventService.findEvent(request);
        if (findEvent) {
            await eventService.updateEventService(request);
            responseHandler(response, STATUS.SUCCESSSTATUS, {}, STATUS.SUCCESS, "Event updated successfully");
        } else {
            responseHandler(response, STATUS.SUCCESSSTATUS, {}, STATUS.ERROR, "Event not found");
        }
    } catch (error) {
        responseHandler(response, STATUS.INTERNALSERVERSTATUS, error, STATUS.ERROR, "Internal server error");

    }
}
//for listing particular event

exports.listEvent = async (request, response) => {
    try {
        let listEventRes = await eventService.listEvent(request);
        if (listEventRes.length) {
            responseHandler(response, STATUS.SUCCESSSTATUS, listEventRes, STATUS.SUCCESS, "Event list successfully");
        } else {
            responseHandler(response, STATUS.SUCCESSSTATUS, {}, STATUS.ERROR, "Event not found");
        }
    } catch (error) {
        responseHandler(response, STATUS.INTERNALSERVERSTATUS, error, STATUS.ERROR, "Internal server error");

    }
}
//for view particular event details

exports.viewEvent = async (request, response) => {
    try {
        let findEvent = await eventService.findEvent(request);
        if (findEvent) {
            let setEventDate = await eventService.setEventDateService(findEvent);
            responseHandler(response, STATUS.SUCCESSSTATUS, setEventDate, STATUS.SUCCESS, "Get event details successfully");
        } else {
            responseHandler(response, STATUS.SUCCESSSTATUS, {}, STATUS.ERROR, "Event not found");
        }
    } catch (error) {
        responseHandler(response, STATUS.INTERNALSERVERSTATUS, error, STATUS.ERROR, "Internal server error");

    }
}