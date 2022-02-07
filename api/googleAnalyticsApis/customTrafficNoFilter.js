import { getGaData } from './Googleapis'
import { google } from 'googleapis'

export default function(ids, startDate, endDate, metrics, dimension, sort , startIndex) {
    let { clientEmail, privateKey } = config.server.google;
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
    const jwt = new google.auth.JWT(clientEmail, null, privateKey, scopes)

    let params = {
        'auth': jwt,
        'ids': 'ga:' + ids,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': metrics,
        'dimensions': dimension,
        'sort': sort,
        // 'filters': filters,
        'start-index': startIndex,
        'max-results': 10000,
    };
    return getGaData(params).then(response => {
        return response;
    })
}