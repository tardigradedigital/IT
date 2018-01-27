var auth = require('./auth'),
    // fs = require('fs');
    users = require('../controllers/users'),
    // parts = require('../controllers/parts'),
    // db = require('../controllers/db'),
    // ps = require('../controllers/ps'),
    inv = require('../controllers/inv');
    // mongoose = require('mongoose'),
    // passport = require('passport'),
    // multer = require('multer'),
    // User = mongoose.model('User'),
    // upl = multer({dest: 'psae/tmp/'});

module.exports = function(app, env, ver, dbSite) {
  app.locals.env = env;
  app.locals.ver = ver;
  // Disable cache for testing
  // app.get('/*', function(req, res, next) {
  //   res.setHeader('Cache-Control', 'public, max-age=7200000');
  //   res.setHeader('Expires', new Date(Date.now() + 7200000).toUTCString());
  //   next();
  // });
  
  /* CORS */
  app.use(function(req, res, next) {
    var cors = { origin: [dbSite, 'use.fontawesome.com'] };
    var origin = cors.origin.indexOf(req.header('host').toLowerCase()) > -1 ? req.headers.origin : cors.origin[0];
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  /* API Routes */
  app.get('/api/inv/categories', auth.requiresRole('admin'), inv.getCategories);
  app.get('/api/inv/manufacturers', auth.requiresRole('admin'), inv.getManufacturers);
  app.get('/api/inv/stores', auth.requiresRole('admin'), inv.getStores);
  app.get('/api/inv/suppliers', auth.requiresRole('admin'), inv.getSuppliers);
  app.get('/api/inv/parts/:partNum', auth.requiresRole('admin'), inv.getParts);
  app.get('/api/inv/parts', auth.requiresRole('admin'), inv.getParts);
  app.put('/api/inv/parts', auth.requiresRole('admin'), inv.updatePart);
  app.get('/api/inv/po', auth.requiresRole('admin'), inv.getPO);
  // Users API
  app.post('/api/me', auth.requiresApiLogin(), users.changeSettings);
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.get('/api/users/total', auth.requiresRole('admin'), users.getUserCount);
  // app.purge('/api/users', auth.requiresRole('admin'), users.purgeUsers);
  // // Parts API
  // app.get('/api/parts', auth.requiresRole(['invmnt', 'invuser']), parts.getParts);
  // app.get('/api/parts/:partNum', auth.requiresRole(['invmnt', 'invuser']), parts.getParts);
  // app.post('/api/parts', auth.requiresRole(['invmnt', 'invuser']), parts.createPart);
  // app.put('/api/parts/:partNum', auth.requiresRole(['invmnt', 'invuser']), parts.updatePart);
  // app.delete('/api/parts/:partNum', auth.requiresRole('admin'), parts.deletePart);
  // // Serialized Parts API
  // app.get('/api/sparts/:partNum', auth.requiresRole(['invmnt', 'invuser']), parts.getSerializedParts);
  // app.post('/api/sparts', auth.requiresRole(['invmnt', 'invuser']), parts.createSerializedPart);
  // app.put('/api/sparts/:sPartSerial', auth.requiresRole(['invmnt', 'invuser']), parts.consumeSerializedPart);
  // app.delete('/api/sparts/:sPartSerial', auth.requiresRole('invuser'), parts.deleteSerializedPart);
  // // Part History API
  // app.get('/api/partlog', auth.requiresRole(['invmnt', 'invuser']), parts.getPartHistory);
  // app.get('/api/partlog/:partNum', auth.requiresRole(['invmnt', 'invuser']), parts.getPartHistory);
  // app.post('/api/partlog', auth.requiresRole(['invmnt', 'invuser']), parts.addPartHistory);
  // // Database API [Deprecated]
  // //app.copy('/api/db', auth.requiresRole('admin'), db.syncDb);
  // // Automation API
  // app.get('/api/autom', auth.requiresRole('ituser'), ps.getAuthKey);
  // app.post('/api/autom', auth.requiresRole('ituser'), ps.createAuthKey);
  // app.post('/api/autom/session', auth.requiresRole('ituser'), ps.openConnection)
  // app.get('/api/automs', auth.requiresRole('ituser'), ps.getAutomScripts);
  // app.get('/api/automs/:id', auth.requiresRole('ituser'), ps.getAutomScripts);
  // app.post('/api/automs', auth.requiresRole('ituser'), upl.single('payLoad'), ps.importAutomScript);
  
  // app.get('/admin/*', auth.requiresRole('admin'), function(req, res) {
  //   if(req.headers.referer) {
  //     var path = '../../public/app/admin/' + req.params[0];
  //     res.render(path); 
  //   }
  //   else {
  //     try {
  //       fs.statSync()
  //       var path = '../../public/app/admin/' + req.params[0];
  //       res.render(path); 
  //     }
  //     catch(e) {
  //       res.render('index', {
  //         bootstrappedUser: req.user,
  //         stageEnv: req.app.locals.env,
  //         appVersion: req.app.locals.ver
  //       });
  //     }
  //   }
  // });
  
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0], {}, function(err, page) {
      if(err) { console.log(err); res.sendStatus(404); }
      else res.send(page);
    });
  });
    
  app.post('/login', auth.authenticate);
  app.post('/logout', auth.revokeAuth);

  app.all('/api/*', function(req, res) {
    res.sendStatus(404);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      setUser: req.user,
      setEnv: req.app.locals.env,
      appVersion: req.app.locals.ver
    });
  });
}