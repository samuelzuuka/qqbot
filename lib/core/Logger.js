/**
 * Created by samuelzuuka<samuelzuuka@gmail.com> on 2016/9/19.
 */

/**
 * A thin package of log
 */


import Log from 'log';


export default class Logger{

    constructor(level){
        this.logger = new Log(level);
    }

    log(msg){
        this.logger.log(msg);
    }

    static getDebugger(){

        return  new Logger('debug');

    }

}

