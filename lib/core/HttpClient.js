/**
 * Created by samuel on 2016/9/21.
 */


import _ from 'underscore';
import http from 'http';
import https from 'https';
import querystring from 'querystring';
import URL from 'url';


class HttpClient{

    getCookies(){
        return HttpClient.cookies;
    }

    getCookieString(){
        let cookieMap = {};
        HttpClient.cookies.forEach(function (item) {
            let v = item.split(' ')[0];
            let kv = v.trim().split('=');
            if(kv[1] != ';'){
                cookieMap[kv[0]] = kv[1];
            }
        });
        let arr = [];
        for(let key in cookieMap){
            arr.push(key + '='+cookieMap[key]);
        }
        return arr.join(' ');
    }

    updateCookie(cookies){
        if(cookies){
            HttpClient.cookies = _.union(HttpClient.cookies,cookies);
        }
    }

}


HttpClient.cookies = [];