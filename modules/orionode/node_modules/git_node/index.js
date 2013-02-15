var fs = require('fs');
var ph = require('path')

var init = function(path)
{
    var files = ['config', 'description', 'HEAD', 'index'];
    var folders = ['branches', 'hooks', 'info', 'refs'];
    var foldersInObjects = ['objects/info', 'objects/pack']
    fs.mkdir(path, function (err) {
    console.log(path);
        if (err) throw err;
        files.forEach(function(item) {
            fs.open(ph.join(path, item), 'w', function (err, fd){
                console.log(ph.join(path, item));
                if (err) throw err;
                fs.close(fd, function (err) {
                    if (err) throw err;
                });
            });
        });
        folders.forEach(function(item) {
            fs.mkdir(ph.join(path, item), function (err) {
                console.log(ph.join(path, item));
                if (err) throw err;
            });  
        });
        fs.mkdir(ph.join(path, 'objects'), function (err) {
            console.log(ph.join(path, 'objects'));
            if (err) throw err;
            foldersInObjects.forEach(function(item) {
                fs.mkdir(ph.join(path, item), function (err) {
                    console.log(ph.join(path, item));
                    if (err) throw err;
                });  
            });
        });
    });
}

var initInPath = function(path)
{
    init(ph.join(path, '.git'));
}

var git = function(pathToRepo)
{
    var splitedPath = pathToRepo.split(ph.sep)
    pathToRepo = ph.resolve(pathToRepo);
    console.log('1',pathToRepo);
    if(splitedPath[splitedPath.length-1] === '.git')
    {
        console.log('Path to .git was given');
        this.path = pathToRepo;
    }
    else
    {
        this.path = ph.join(pathToRepo, '.git');
        console.log('Path was given without .git');
    }
    console.log('2', this.path);
    var arg = this.path;
    fs.exists(arg, function (exists) 
    {
        exists ? console.log('.git in folder') : console.log('No .git in folder');
        if(!exists)
        {
            console.log('There is no repository here so I am doing git init');
            init(arg);
        }
    });
    
    
}
git.prototype = 
{
    add: function()
    {
    
    }


}
exports.git = git;
exports.init = initInPath;