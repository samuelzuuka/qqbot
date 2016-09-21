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

        this.reloadPlugins();

    }

    dispatch(){

        let params = arguments.length >= 1 ? Array.slice.call(arguments,0) : [];

        this.listeners.forEach(function (plugin) {
            plugin.apply(null,params);
        });
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

        return this.stopPlugins.map(function (plugin, index, arr) {
            return plugin(robot);
        });
    }

    reloadPlugins(){

        this.onStopPlugins();

        this.listeners = [];

        this.plugins.forEach(function (plugin, index, arr) {

            let Plugin = CoreUtils.liveRequire('../plugins/' + plugin);

            let _plugin = new Plugin();

            _plugin.onPluginInit(this.robot);

            this.listeners.push(_plugin.onPluginRun());

            this.stopPlugins.push(_plugin.onPluginStop());


        }.bind(this));


    }

}

Dispatcher.ON_MESSAGE_RECEIVED = 1;

Dispatcher.ON_MESSAGE_HANDLED = 2;

Dispatcher.ON_AFTER_ROBOT_INITIATED = 3;

Dispatcher.ON_BEFORE_ROBOT_DESTROY = 4;

