/**
 * Created by samuel on 2016/9/18.
 */



import fs from 'fs';

import path from 'path';

import _ from 'underscore';


var userHome = process.env[(process.platform=='win32')?'USERPROFILE':'HOME'];

/**
 * CookieHelper Class For Cookie Store of QQ_WEB_Proto
 */
export default class CookieHelper{

    /**
     * set new path of cookie file
     * @param newPath new path of cookie file
     */
    static setPath(newPath){
        if(!_.isEmpty(newPath)){
            CookieHelper.storePath = newPath;
        }
    }

    /**
     * operate a k - v  pair from cookie
     *
     *  1. if both k,v is pointed, set k - v pair in cookie;
     *  2. if k is pointed, get value of the key from cookie
     *  3. if neither of k, v is pointed, return cookie content
     *
     *
     * @param key    key to operate
     * @param value  value to operate
     * @returns {*}
     */
    static data(key,value){

        if(_.isEmpty(CookieHelper.defaultsData)){
            CookieHelper.read();
        }
        // store k - v pair
        if(!_.isEmpty(key) && !_.isEmpty(value)){
            CookieHelper.defaultsData[key] = value;
        // get key value
        }else if(!_.isEmpty(key)){
            return CookieHelper.defaultsData[key];
        // return cookie
        }else {
            return CookieHelper.defaultsData;
        }
    }

    /**
     * save cookie to file
     */
    static save(){
        let dir = path.join(userHome,'.tmp');
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        return fs.writeFileSync(CookieHelper.storePath,JSON.stringify(CookieHelper.defaultsData));
    }

    /**
     * read cookie from temp file
     * @returns {*}
     */
    static read(){
        CookieHelper.defaultsData = JSON.parse(fs.readFileSync(CookieHelper.storePath));
        return CookieHelper.defaultsData;
    }

}

// class - data to store path of cookie file
CookieHelper.storePath = path.join(userHome,'.tmp','store.json');


// class - data to store data of cookie
CookieHelper.defaultsData = {};