import * as googleApis from '../api/googleAnalyticsApis'
import query from '../mysql-connect';
import moment from 'moment';
import express from 'express';
const router = express.Router();

//當下即時Active Users
router.post('/rtUser', async function(req, res, next) {
    let rtAllActiveUser = 0;
    let rtActiveUserResult = await googleApis.realtimeByTrafficTypeAndTotal(allIds, "activeUsers")
    for (let i = 0; i < rtActiveUserResult.length; i++) {
        let rtAllActiveUser = rtAllActiveUser + parseInt(rtActiveUserResult[i][1])
    }
    res.send({ rtAllActiveUser });
});

module.exports = router;