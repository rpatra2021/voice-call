const models = require('@models');
const moment = require("moment");
const TIMEZONE = "Asia/Kolkata";

exports.callStart = async function(req, res){
    console.log(req.body);
    const roomId = req.body.ROOM || null;
    const userId = req.body.USER_ID || null;
    const userName = req.body.USER_NAME || null;
    if (!roomId || !userId || !userName) return res.send({success:false});
    let model = await models.call_history.findOne({ where: {roomId,userId,userName} });
    const startDateTime = moment.tz(moment(), TIMEZONE);
    console.log("startDateTime", startDateTime);
    if (!model) await models.call_history.create({ roomId,userId,userName,callStartedAt: startDateTime});
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
    return res.send({success:true});
}