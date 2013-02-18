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
 
function doJob(handler, rest, req, res) {
	var methodName = rest[0] === '/' ? rest.split('/')[1] : rest.split('/')[0];
	var method = handler[methodName];
	var queryData = "";
	req.on('data', function(data) {
		queryData += data;
		if(queryData.length > 1e6) {
			queryData = "";
			res.writeHead(413, {'Content-Type': 'text/plain'});
			req.connection.destroy();
		}
	});
	req.on('end', function() {
		write(200, res, null, method(rest, queryData));
	});    
}

module.exports = function(options) {
	
	var fileRoot = options.root;

	/*
	 * Handler begins here
	 */
	return connect()
	.use(connect.json())
	.use(resource(fileRoot, {
		GET: function(req, res, next, rest) {
			var handler = getHandlers;
			doJob(handler, rest, req, res);
		},

		POST: function(req, res, next, rest) {
			var handler = posttHandlers;
			doJob(handler, rest);
			
		},
		DELETE: function(req, res, next, rest) {
			var handler = deleteHandlers;
			doJob(handler, rest);
		},
	
		PUT: function(req, res, next, res) {
			var handler = putHandlers;
			doJob(handler, rest);
		},

	}));
};

getHandlers = {
	branch : getBranch,
	clone : getClone,
	commit : getCommit,
	config : getConfig,
	diff : getDiff,
	index : getIndex,
	remote : getRemote,
	status : getStatus,
	tag : getTag
};
putHandlers = {
	branch : putBranch,
	clone : putClone,
	commit : putCommit,
	config : putConfig,
	diff : putDiff,
	index : putIndex,
	remote : putRemote,
	status : putStatus,
	tag : putTag
};
postHandlers = {
	branch : postBranch,
	clone : postClone,
	commit : postCommit,
	config : postConfig,
	diff : postDiff,
	index : postIndex,
	remote : postRemote,
	status : postStatus,
	tag : postTag
};
deleteHandlers = {
	branch : deleteBranch,
	clone : deleteClone,
	commit : deleteCommit,
	config : deleteConfig,
	diff : deleteDiff,
	index : deleteIndex,
	remote : deleteRemote,
	status : deleteStatus,
	tag : deleteTag
};

function getBranch(rest, queryData) {
	
}

function getClone(rest, queryData) {
	return { 
  "Children": [ 
    { 
      "BranchLocation": "/gitapi/branch/file/ilovegame/Hello%20World/", 
      "CommitLocation": "/gitapi/commit/file/ilovegame/Hello%20World/", 
      "ConfigLocation": "/gitapi/config/clone/file/ilovegame/Hello%20World/", 
      "ContentLocation": "/file/ilovegame/Hello%20World/", 
      "DiffLocation": "/gitapi/diff/Default/file/ilovegame/Hello%20World/", 
      "HeadLocation": "/gitapi/commit/HEAD/file/ilovegame/Hello%20World/", 
      "IndexLocation": "/gitapi/index/file/ilovegame/Hello%20World/", 
      "Location": "/gitapi/clone/file/ilovegame/Hello%20World/", 
      "Name": "Hello World", 
      "RemoteLocation": "/gitapi/remote/file/ilovegame/Hello%20World/", 
      "StatusLocation": "/gitapi/status/file/ilovegame/Hello%20World/", 
      "TagLocation": "/gitapi/tag/file/ilovegame/Hello%20World/", 
      "Type": "Clone" 
    }
  ], 
  "Type": "Clone" 
};
}

function getCommit(rest, queryData) {
	
}

function getConfig(rest, queryData) {
	
}
function getDiff(rest, queryData) {
	
}

function getIndex(rest, queryData) {
	
}

function getRemote(rest, queryData) {
	
}

function getStatus(rest, queryData) {
	
}

function getTag(rest, queryData) {
	
}


function postBranch(rest, queryData) {
	
}

function postClone(rest, queryData) {
	
}

function postCommit(rest, queryData) {
	
}

function postConfig(rest, queryData) {
	
}
function postDiff(rest, queryData) {
	
}

function postIndex(rest, queryData) {
	
}

function postRemote(rest, queryData) {
	
}

function postStatus(rest, queryData) {
	
}

function postTag(rest, queryData) {
	
}

function putBranch(rest, queryData) {
	
}

function putClone(rest, queryData) {
	
}

function putCommit(rest, queryData) {
	
}

function putConfig(rest, queryData) {
	
}
function putDiff(rest, queryData) {
	
}

function putIndex(rest, queryData) {
	
}

function putRemote(rest, queryData) {
	
}

function putStatus(rest, queryData) {
	
}

function putTag(rest, queryData) {
	
}

function deleteBranch(rest, queryData) {
	
}

function deleteClone(rest, queryData) {
	
}

function deleteCommit(rest, queryData) {
	
}

function deleteConfig(rest, queryData) {
	
}
function deleteDiff(rest, queryData) {
	
}

function deleteIndex(rest, queryData) {
	
}

function deleteRemote(rest, queryData) {
	
}

function deleteStatus(rest, queryData) {
	
}

function deleteTag(rest, queryData) {
	
}