import { google } from 'googleapis'

let { clientEmail, privateKey } = config.server.google;
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const jwt = new google.auth.JWT(clientEmail, null, privateKey, scopes)

export async function getGaRealTimeData(params) {
    const jwtAuth = await jwt.authorize()
    const result = await google.analytics('v3').data.realtime.get(params)
    return result.data.rows;
}