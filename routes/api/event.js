/**
event for manage all route related stuff
**/
const express = require('express');
const router = express.Router();

const eventController = require("../../controller/event.controller");

router.post("/add", eventController.addEvent);
router.put("/edit/:id", eventController.editEvent);
router.post("/list", eventController.listEvent);
router.get("/view/:id", eventController.viewEvent);


module.exports = router