import { getGaRealTimeData } from './GaRealTimeApi'
import { google } from 'googleapis'

const TRAFFIC_TYPE = {
    DIRECT: '直接',
    SOCIAL: '社交',
    ORGANIC: '自然',
    REFERRAL: '參照',
    CUSTOM: '其他'
}

export default function(ids, metrics) {
    let { clientEmail, privateKey } = config.server.google;
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
    const jwt = new google.auth.JWT(clientEmail, null, privateKey, scopes)
    let params = {
        'auth': jwt,
        'ids': 'ga:' + ids,
        'metrics': 'rt:' + metrics,
        'dimensions': 'rt:medium',
        'sort': '-rt:' + metrics,
        'max-results': 35,
    };
    return getGaRealTimeData(params).then(response => {
        return response;
    })
}