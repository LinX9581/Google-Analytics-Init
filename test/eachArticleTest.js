import * as googleApis from '../api/googleAnalyticsApis'
const { google } = require('googleapis');
const keys = require('../gsKey.json');
var express = require('express');
var router = express.Router();
const moment = require('moment')

// test()
async function test(){
    await getNNDailyChannelPv()
    // await getBabyouDailyChannelPv ()
    // await getPetsmaoDailyChannelPv()
}

//超過10000筆解決方式
//https://stackoverflow.com/questions/16829512/unable-to-retrieve-more-than-10k-records-from-google-analytics/16838661
async function getNNDailyChannelPv() {
    try {
        //Ga View Id    
        let allIds = '106152872'

        let allArticleIdArray = [];
        let allArticleInfoArray = [];
        let articlePvArray = [];
        let articleAmpPvArray = [];
        let articleAmp = [];

        var nnChanel = ["/life/", "entertainment", "sport", "local", "finance", "health-life",
            "gama", "clips", "show", "house2", "chinaindex", "global", "forum-2", "column", "novelty", "politics","amp"
        ]
        let yesterday = moment(new Date()).add(-1, 'days').format('YYYYMMDD');
        let delete14Day = moment(new Date()).add(-14, 'days').format('YYYYMMDD');
        // let yesterday = "20200108"
        let gaYesterday = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
        // let gaYesterday = "2020-01-08"
        console.log(yesterday+"日報時間")     

        //撈大於1萬筆資料
        var startIndex = 1;
        var allDailyData = []
        var dataIndex = 0
        for(var i=0; i<7; i++)
        {
            dataIndex = dataIndex + 1
            let dailyData = await googleApis.costomizeTraffic(allIds, gaYesterday, gaYesterday, "ga:pageviews", "ga:pagePath", "-ga:pageviews", "ga:hostname==www.nownews.com",startIndex);
            if(dailyData != null)
            {
                allDailyData.push(dailyData)
            }else if (dailyData == null){
                break;
            }else{
                break;
            }
            startIndex =  dataIndex * 10000 + 1
        }
        let dailyData = allDailyData.flat()
        console.log(dailyData.length)
        // console.log(dailyData)

        //取得文章ID 有重複 & 取得amp文章和PV
        for (var i = 0; i < dailyData.length-1; i++) {
            if (dailyData[i][0].match(/\d{7}/)) {
                allArticleIdArray.push(dailyData[i][0].match(/\d{7}/)[0])
            }
            if (dailyData[i][0].match("/amp/")) {
                articleAmp.push([dailyData[i][0],dailyData[i][1]])
            }
        }
        // console.log(articleAmp)
        //取得不重複文章ID
        var articleIdArray = allArticleIdArray.filter(function(element, index, arr) {
            return arr.indexOf(element) === index;
        });

        //取得所有文章&PV
        for (var i = 0; i < dailyData.length; i++) {
            if (dailyData[i][0].match(/\d{7}/)) {
                allArticleInfoArray.push([dailyData[i][0].match(/\d{7}/)[0], dailyData[i][1], dailyData[i][0]])
            }
        }
        let pv = 0;
        let ampPv = 0;
        let eachArticleChannel = []
        let eachArticleAllChannelArray = []
            // 取得個流量PV加總&分類
        for (var k = 0; k < articleIdArray.length; k++) {
            pv = 0;
            ampPv = 0;
            eachArticleChannel = [];
            //加總每個文章PV
            for (var n = 0; n < allArticleInfoArray.length; n++) {
                if (articleIdArray[k] == allArticleInfoArray[n][0]) {
                    //取得該文章 各流量的PV加總
                    pv = pv + parseInt(allArticleInfoArray[n][1])
                        //取得該文章是哪些分類
                    for (var m = 0; m < nnChanel.length; m++) {
                        if (allArticleInfoArray[n][2].match(nnChanel[m])) {
                            eachArticleChannel.push(nnChanel[m])
                        }
                    }
                }
            }
            //加總每個文章 的 amp流量
            for (var n = 0; n < articleAmp.length; n++) {
                if (articleIdArray[k] == articleAmp[n][0].match(/\d{7}/)) {
                    //取得該文章 各流量的PV加總
                    ampPv = ampPv + parseInt(articleAmp[n][1])
                }
            }

            // console.log(pv)
            eachArticleAllChannelArray.push(eachArticleChannel)
            articlePvArray.push(pv)
            articleAmpPvArray.push(ampPv)
        }

        // test single article
        for (var i = 0; i < allArticleInfoArray.length; i++) {
            if (allArticleInfoArray[i][0] == "5178022") {
                console.log(allArticleInfoArray[i])
            }
        }
        let wwwData = await googleApis.costomizeTraffic(allIds, gaYesterday, gaYesterday, "ga:pageviews", "ga:pagePath", "-ga:pageviews", "ga:hostname==www.nownews.com");
        var indexPv = 0;
        for (var i = 0; i < wwwData.length-1; i++) {
            if (wwwData[i][0] == "/") {
                console.log(indexPv + "首頁PV")
                indexPv = indexPv + parseInt(wwwData[i][1])
            }
        }

        // 重複分類 合併
        var eachArticleChannelArray = []
        var articleChannelArray = []
        for (var i = 0; i < eachArticleAllChannelArray.length; i++) {
            eachArticleChannelArray = eachArticleAllChannelArray[i].filter(function(element, index, arr) {
                return arr.indexOf(element) === index;
            });
            articleChannelArray.push(eachArticleChannelArray)
        }

        var articleInfoArray = []
        for (var i = 0; i < articleIdArray.length; i++) {
            articleInfoArray.push([articleIdArray[i], articlePvArray[i], articleAmpPvArray[i]])
        }

        return dailyData;
    } catch (err) {
        console.error(err);
    }
}


exports = router;
