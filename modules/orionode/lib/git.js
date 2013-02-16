/*******************************************************************************
 * Copyright (c) 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*global Buffer console module process require*/
var compat = require('./compat');
var connect = require('connect');
var fs = require('fs');
var path = require('path');
var url = require('url');
var api = require('./api'), write = api.write, writeError = api.writeError;
var fileUtil = require('./fileUtil'), ETag = fileUtil.ETag;
var resource = require('./resource');

var USER_WRITE_FLAG = parseInt('0200', 8);
var USER_EXECUTE_FLAG = parseInt('0100', 8);


/*
 *
 * Module begins here
 *
 */
module.exports = function(options) {
	
	var fileRoot = options.root;

	/*
	 * Handler begins here
	 */
	return connect()
	.use(connect.json())
	.use(resource(fileRoot, {
		//jak sie to wywali, to przestaje dzialac :) nie mam pojecia
		//do czego to jest potrzebne, ale w przegladarce widac efekt -
		//na kazdej podstronie gita wyswietla sie blad :)
		GET: function(req, res, next, rest) {
			writeError(404, res, 'File not found: ');
		},

		POST: function(req, res, next, rest) {
			console.log("obsluga requesta\n");
			req.on('data', function(data) {
				console.log(data.toString('utf8', 0, data.length));
				writeError(500, res, "blad");
			});
				

		},

	}));
};
