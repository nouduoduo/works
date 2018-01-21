exports.mapRoute = function(app, prefix) {

    prefix = '/' + prefix ;
 
    var prefixObj = require('./controllers' + prefix+ '.controller');
 
    // index
    app.get(prefix, prefixObj.index);

    // add
    app.get(prefix + '/new', prefixObj.new);
 
    // show
    app.get(prefix + '/show/:sn', prefixObj.show);

    //post show
    app.post(prefix + '/show', prefixObj.postshow);

    // create
    app.post(prefix + '/create', prefixObj.create);
 
    // edit
    app.get(prefix + '/edit/:sn/', prefixObj.edit);
 
    // update
    app.put(prefix + '/update/:sn', prefixObj.update);
 
    // delete
    app.delete(prefix + '/destroy/:sn', prefixObj.destroy);
 
    // export data
    app.post(prefix + '/export', prefixObj.export);
 };
 
 