# Note
git clone 
yarn install
yarn start

1. 所有匯出排程都在 routes/allSchedule.js
2. 需要全域設定檔 預設檔名 ./config.js 會由global.js import
```
module.exports = {
    server: {
        // 這裡要申請 ga api key
        google: {
            "type": "service_account",
            "project_id": "",
            "private_key_id": "",
            "private_key": "",
            "client_email": ".iam.gserviceaccount.com",
            "client_id": "",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/analytics-apis%40.iam.gserviceaccount.com"
        },
    },
    gaViewId: {
        allIds: '106152872',
        screemViewsIds: '226856028',
    }
};

```

## 數據誤差 3~5%
撈的資料 有沒有加filter hostname會不一樣
dimention 用 path 和 title 數據也會不一樣
但整體線性圖都是一樣的

## 資源
GA-Api Dimension
https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/

GA-Api 更詳細的 維度 含線上 Query
https://developers.google.com/analytics/devguides/reporting/core/v3/common-queries#top-content

線上 Query 含 API
https://ga-dev-tools.appspot.com/query-explorer/

Realtime Dimention
https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/trafficsources

V4 流量來源
https://developers.google.com/analytics/devguides/reporting/core/v4/advanced

日本人文件
https://blog.mintsu-dev.com/posts/2019-07-16-nuxtjs-google-analytics-api/

Nodejs Youtube
https://www.youtube.com/watch?v=MiPpQzW_ya0

相關維度
平均 seesion 停留時間
ga:avgSessionDuration

pm2 logs 14 --lines=600


