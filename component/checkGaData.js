import * as googleApis from '../api/googleAnalyticsApis'

async function checkGaData() {
    let message = ''
    let subsitePvData = await googleApis.custom('191037765', 'yesterday', 'yesterday', 'ga:pageviews', "ga:hour")
    let mainPvData = await googleApis.custom('106152872', 'yesterday', 'yesterday', 'ga:pageviews', "ga:date")
    let channelPvData = await googleApis.customHour('253224028', 'yesterday', 'yesterday', 'ga:pageviews', "ga:hour")
    if (subsitePvData[0][1] == 0 || mainPvData[0][1] == 0 || channelPvData[23][1] == 0) {
        if (subsitePvData[0][1] == 0) message += ' 子站沒數據 '
        if (mainPvData[0][1] == 0) message += ' 主網沒數據 '
        if (channelPvData[23][1] == 0) message += ' 頻道數據不完整 '
    } else message = 1;
    return message;
}

export { checkGaData }