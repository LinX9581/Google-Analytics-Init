import schedule from 'node-schedule';
import moment from 'moment';
import * as checkGaData from '../component/checkGaData';

// 每日確認GA數據
schedule.scheduleJob('0 5 12 * * *', async function() {
    // let checkData = await checkGaData.checkGaData()
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}