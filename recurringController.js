const { Recurring } = require('./model');
const moment = require('moment');
const interval = require('interval-promise');

async function insert(data) {
    console.log('data', data);
    const duration = moment.duration({
        seconds: data.seconds,
        minutes: data.minutes,
        hours: data.hours,
        days: data.days,
        weeks: data.weeks,
        months: data.months,
        years: data.years
    }).toISOString();
    const nextUpdate = moment().add(moment.duration(duration)).toDate();
    const retData = await Recurring.query().insert({task: data.task, duration: duration, update_at: nextUpdate});
    console.log('data returned', retData);
    return retData;
}

interval(async () => {
    const data = await Recurring.query().where('update_at', '<', new Date());
    let promiseArr = [];
    data.forEach(async (record, index) => {
        console.log(record.task);
        console.log(record.duration);
        const updateAt = moment().add(moment.duration(record.duration)).toDate();
        const data =  promiseArr.push(Recurring.query().patch({update_at: updateAt}).where('id', record.id));
    });
    const returnData = await Promise.all(promiseArr);
    console.log(returnData);
}, 1000*5);

module.exports = {
    insert
}