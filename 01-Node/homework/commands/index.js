var fs = require('fs');
const { request } = require('http');



module.exports = {
    echo: function(args, print){ print(args.join(' '))},
    pwd: function(args, print){print(process.env.PWD)},
    date: function(args, print) {print(Date())},
    ls: function(args, print){
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
              print(file.toString() + '\n');
            })
          });
    },
    cat: function(args, print){
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            print(data);
        })
    },
    head: function(args, print){
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            print(data.split('\n').splice(0, args[1]).join('\n'));
        })
    },
    tail: function(args, print){
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            print(data.split('\n').splice(-args[1]).join('\n'));
        })
    },
    curl: function(args, print){
        request(args[0], function(err, data){
            if(err) throw err,
            print(data.body)
        })
    },
}