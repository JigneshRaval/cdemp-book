// utils.js
//===========================================

/**
 * This file contains all the common Utility functions
 */
const  fs			= require('fs'),
       path         = require('path'),
	   Handlebars	= require('handlebars');

var UtilsModule = (function(){

    // Render Handlebars Template with the Given Data
    // Pass file name, Data to be display and callback function
    function renderHBTemplates(fileName, data, callback) {
        var template, html;

        fs.readFile(path.join(__dirname, fileName), 'utf-8', function(error, source){
            if(data) {
                template = Handlebars.compile(source); 	        // Get HTML by reading .hbs file
                html = template(data); 					        // Merge HTML with DATA
            } else {
                html = source;
            }
            
            return callback(html);
        });

    }

    return {
        renderHBTemplates: renderHBTemplates
    }
})();

module.exports = UtilsModule;