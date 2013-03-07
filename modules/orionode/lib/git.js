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
var git = require('gitnode');
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
 
function doJob(handler, rest, req, res, workspaceDir) {
	//TODO handle invalid requests
	var methodName = rest[0] === '/' ? rest.split('/')[1] : rest.split('/')[0];
	var method = handler[methodName];
	var queryData = "";
	req.on('data', function(data) {
		queryData += data;
	});
	req.on('end', function() {
		var json = null;
		if (queryData.length > 0)
		{
			json = JSON.parse(queryData);
		}
		method(res, rest, json, workspaceDir);
	});
}

module.exports = function(options) {
	console.log("OPT: " + options);
	console.log("OPT: " + url);
	var fileRoot = options.root;
	var workspaceDir = options.workspaceDir;
	/*
	 * Handler begins here
	 */
	return connect()
	.use(connect.json())
	.use(resource(fileRoot, {
		GET: function(req, res, next, rest) {
			var handler = getHandlers;
			doJob(handler, rest, req, res, workspaceDir);
		},

		POST: function(req, res, next, rest) {
			var handler = postHandlers;
			doJob(handler, rest, req, res, workspaceDir);
			
		},
		DELETE: function(req, res, next, rest) {
			var handler = deleteHandlers;
			doJob(handler, rest, req, res, workspaceDir);
		},
	
		PUT: function(req, res, next, rest) {
			var handler = putHandlers;
			doJob(handler, rest, req, res, workspaceDir);
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

function getBranch(res, rest, dataJson, workspaceDir) {
	
}

function getClone(res, rest, dataJson, workspaceDir) {
	//GET /gitapi/clone/workspace/P/ on wiki, but in fact - it's different
	//rest == clone/workspace/orionode
	var repositories = [];

	function sendResponse()
	{
		var entries = [ ];
		repositories.forEach(function (repository) {
			//TODO
			var entry = {
				"BranchLocation": "/gitapi/branch/file/ilovegame/Hello%20World/", 
				"CommitLocation": "/gitapi/commit/file/ilovegame/Hello%20World/", 
				"ConfigLocation": "/gitapi/config/clone/file/ilovegame/Hello%20World/", 
				"ContentLocation": "/file/ilovegame/Hello%20World/", 
				"DiffLocation": "/gitapi/diff/Default/file/ilovegame/Hello%20World/", 
				"HeadLocation": "/gitapi/commit/HEAD/file/ilovegame/Hello%20World/", 
				"IndexLocation": "/gitapi/index/file/ilovegame/Hello%20World/", 
				"Location": "/gitapi/clone/file/ilovegame/Hello%20World/", 
				"Name": repository,
				"RemoteLocation": "/gitapi/remote/file/ilovegame/Hello%20World/", 
				"StatusLocation": "/gitapi/status/file/ilovegame/Hello%20World/", 
				"TagLocation": "/gitapi/tag/file/ilovegame/Hello%20World/", 
				"Type": "Clone" 
			}
			entries.push(entry);
		});

		var json = JSON.stringify( { "Children" : entries, "Type": "Clone" } );
		write(200, res, null, json);
	}

	fs.readdir(workspaceDir, function (err, list)
	{
		//TODO send response when list is empty
		if (err)
		{
			writeError(500, res, 'Error occured ');
		} else {
			var filesCount = list.length;
			var filesVerified = 0;
			list.forEach(function (file) {
				var path = workspaceDir + "/" + file;
				fs.stat(path, function (err, stat) {
					if (err)
					{
						writeError(500, res, 'Error occured ');
					}
					else if (stat.isDirectory())
					{
						var gitDir = path+'/.git';
						fs.exists(gitDir, function (exists) {
							if (exists)
							{
								repositories.push(file);	
							}
							filesVerified++;
							if (filesVerified === filesCount)
							{
								sendResponse();
							}
						});
					}
					else 
					{
						filesVerified++;
						if (filesVerified === filesCount)
						{
							sendResponse();
						}
					}
				});
			});
		}		
	});
}

function getCommit(res, rest, dataJson, workspaceDir) {
	
}

function getConfig(res, rest, dataJson, workspaceDir) {
	
}
function getDiff(res, rest, dataJson, workspaceDir) {
	
}

function getIndex(res, rest, dataJson, workspaceDir) {
	
}

function getRemote(res, rest, dataJson, workspaceDir) {
	
}

function getStatus(res, rest, dataJson, workspaceDir) {
	
}

function getTag(res, rest, dataJson, workspaceDir) {
	
}


function postBranch(res, rest, dataJson, workspaceDir) {
	
}

function postClone(res, rest, dataJson, workspaceDir) {
	//TODO req: {"Name":"repo","Location":"/workspace/orionode"} - workspace or .workspace ?
	var dir = workspaceDir + '/' + dataJson['Name'];
	fs.mkdir(dir, function (err) {
		if (err)
		{
			writeError(500, res, "Error occured");
		}
		else {
			git.git(dir);
			//TODO location with url
			var resJson = JSON.stringify({ "Location" :  rest + dataJson['Name'] });
			write(201, res, null, resJson)
		}
	});
}

function postCommit(res, rest, dataJson, workspaceDir) {
	
}

function postConfig(res, rest, dataJson, workspaceDir) {
	
}
function postDiff(res, rest, dataJson, workspaceDir) {
	
}

function postIndex(res, rest, dataJson, workspaceDir) {
	
}

function postRemote(res, rest, dataJson, workspaceDir) {
	
}

function postStatus(res, rest, dataJson, workspaceDir) {
	
}

function postTag(res, rest, dataJson, workspaceDir) {
	
}

function putBranch(res, rest, dataJson, workspaceDir) {
	
}

function putClone(res, rest, dataJson, workspaceDir) {
	
}

function putCommit(res, rest, dataJson, workspaceDir) {
	
}

function putConfig(res, rest, dataJson, workspaceDir) {
	
}
function putDiff(res, rest, dataJson, workspaceDir) {
	
}

function putIndex(res, rest, dataJson, workspaceDir) {
	
}

function putRemote(res, rest, dataJson, workspaceDir) {
	
}

function putStatus(res, rest, dataJson, workspaceDir) {
	
}

function putTag(res, rest, dataJson, workspaceDir) {
	
}

function deleteBranch(res, rest, dataJson, workspaceDir) {
	
}

function deleteClone(res, rest, dataJson, workspaceDir) {
	
}

function deleteCommit(res, rest, dataJson, workspaceDir) {
	
}

function deleteConfig(res, rest, dataJson, workspaceDir) {
	
}
function deleteDiff(res, rest, dataJson, workspaceDir) {
	
}

function deleteIndex(res, rest, dataJson, workspaceDir) {
	
}

function deleteRemote(res, rest, dataJson, workspaceDir) {
	
}

function deleteStatus(res, rest, dataJson, workspaceDir) {
	
}

function deleteTag(res, rest, dataJson, workspaceDir) {
	
}
