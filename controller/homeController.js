const models = require('@models');
const moment = require("moment");
const TIMEZONE = "Asia/Kolkata";

exports.callStart = async function(req, res){
    console.log(req.body);
    const roomId = req.body.ROOM || null;
    const userId = req.body.USER_ID || null;
    const userName = req.body.USER_NAME || null;
    if (!roomId || !userId || !userName) return res.send({success:false});
    const startDateTime = moment.tz(moment(), TIMEZONE);
    console.log("startDateTime", startDateTime);

    let callDetails = await models.call.findOne({ where: {roomId, status: 'active'} });
    if (!callDetails) {
        callDetails = await models.call.build();
        callDetails.status = 'active';
        callDetails.callStartedAt = startDateTime;
        callDetails.roomId = roomId;
        await callDetails.save();
    }

    let model = await models.call_history.findOne({ where: {roomId, userId, userName, callId:callDetails.id} });
    if (!model) await models.call_history.create({ roomId, userId, userName, callStartedAt: startDateTime, callId:callDetails.id});
    return res.send({success:true});
}

exports.callEnd = async function(req, res){
    const roomId = req.body.ROOM || null;
    const userId = req.body.USER_ID || null;
    const userName = req.body.USER_NAME || null;
    if (!roomId || !userId || !userName) return res.send({success:false});

    let model = await models.call_history.findOne({ where: {roomId,userId,userName,callEndAt:null} });
    const endDateTime = moment.tz(moment(), TIMEZONE);
    console.log("endDateTime", endDateTime);
    if (model) {
        model.callEndAt = endDateTime;
        await model.save();
    }

    let remainingUserCount = await models.call_history.count({ where: {roomId, callEndAt:null} });
    if (remainingUserCount==0) {
        let callDetails = await models.call.findOne({ where: {roomId, status: 'active'} });
        if (callDetails) {
            callDetails.status='complete';
            callDetails.callEndAt = endDateTime;
            await callDetails.save();
        }
    }

    return res.send({success:true});
}

exports.callHistory = async function(req, res){
    const roomId = req.query.roomId || null;
    if (!roomId) return res.send({success:true, data:[]});
    let callDetails = await models.call.findAll({ 
        where: {roomId,status:"complete"},
        distinct: true,
        attributes: [['id', 'callId'], 'roomId', 'callStartedAt', 'callEndAt'],
        include:[ { attributes:['callId', 'roomId', 'userId', 'userName', 'callStartedAt', 'callEndAt'], model: models.call_history, as: "callUsers", required: true } ],
        order: [["id", "desc"]]
    });
    return res.send({success:true, data: callDetails});
};