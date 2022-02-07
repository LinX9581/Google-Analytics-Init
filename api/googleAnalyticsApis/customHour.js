import { getGaData } from './Googleapis'
import { google } from 'googleapis'

export default function(ids, startDate, endDate, dimension, date) {
    let { clientEmail, privateKey } = config.server.google;
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
    const jwt = new google.auth.JWT(clientEmail, null, privateKey, scopes)

    let params = {
        'auth': jwt,
        'ids': 'ga:' + ids,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': dimension,
        'dimensions': date
    };
    return getGaData(params).then(response => {
        return response;
    })
}