/**
 * Created by samuelzuuka<samuelzuuka@gmail.com> on 2016/9/19.
 */

import _ from 'underscore';

/**
 *
 * Utils Class of Core Module
 *
 */
export default class CoreUtils{

    /**
     * force to reload module from file, instead of from cache
     * @param module_name
     * @returns {*}
     */
    static liveRequire(module_name){
        if(_.isEmpty(module_name)){
            throw  new TypeError('module_name is required!');
        }
        delete require.cache[require.resolve(module_name)];
        return require(module_name);
    }

}
