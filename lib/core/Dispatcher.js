/**
 * Created by samue on 2016/9/19.
 */

import { EventEmitter } from 'events';

import _ from 'underscore';

import Logger from './Logger.js';

var logger = Logger.getDebugger();

import CoreUtils from './CoreUtils.js';


export default class Dispatcher extends EventEmitter{

    constructor(plugins,robot){

        if(_.isEmpty(plugins)){
            plugins = [];
        }
        if(!_.isArray(plugins)){
            plugins = [plugins];
        }
        /**
         * An array of plugins to be executed at some moment
         */
        this.plugins = plugins;

        /**
         * Instance of running robot
         */
        this.robot = robot;

        /**
         * Listeners
         * @type {Array}
         */
        this.listeners = [];

        /**
         * Object Listeners
         * @type {Array}
         */
        this.objectListeners = [];

        /**
         * stop plugins / listeners
         * @type {Array}
         */
        this.stopPlugins = [];

        this.initDispatcher();

    }

    initDispatcher(){


    }

    dispatch(){

    }

    /**
     *
     * Add an listener to listener queue
     *
     * @param listener
     */
    addListener(listener){
        if(_.isFunction(listener)){
            this.listeners.push(listener);
        }else if(_.isObject(listener)){
            this.objectListeners.push(listener);
        }else {
            throw new TypeError('listener should be instance of Object or Function !');
        }
    }

    onStopPlugins(){

        let robot = this.robot;

        return this.stopPlugins.map(function (item, index, arr) {
            return item(robot);
        });
    }

    reloadPlugins(){

        this.stopPlugins();

        this.listeners = [];

        this.plugins.map(function (plugin, index, arr) {

            let Plugin = CoreUtils.liveRequire('../plugins/' + plugin);

            let _plugin = new Plugin();

            this.listeners.push(_plugin.onPluginInit);

            if(__plugin){
                if(__plugin instanceof Function){
                    return this.listeners.push(__plugin);
                }else{




                }

            }

        }.bind(this));


    }

    reloadPlugin(pluginName){



    }

}

Dispatcher.ON_MESSAGE_RECEIVED = 1;

Dispatcher.ON_MESSAGE_HANDLED = 1;

Dispatcher.ON_AFTER_ROBOT_INITIATED = 3;

Dispatcher.ON_BEFORE_ROBOT_DESTROY = 4;

