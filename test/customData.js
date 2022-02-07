import * as googleApis from '../api/googleAnalyticsApis'
import moment from 'moment'
let yesterday = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
let allIds = '106152872'

// subsitePv()
async function subsitePv() {
    let dailyData = await googleApis.custom(allIds, "yesterday", "yesterday", "ga:pageviews");
    console.log(dailyData);
}