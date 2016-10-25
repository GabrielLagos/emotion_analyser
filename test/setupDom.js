/**
 * Created by gooba on 25/10/2016.
 */
var jsdom = require("jsdom");

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator
