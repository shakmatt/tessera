var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Index' });
});

router.get('/pages', function(req, res, next){ 
	res.render('pages', { title: 'Pages'});
});

router.get('/raster', function(req, res, next){ 
	res.render('raster', { title: 'Raster'});
});

router.get('/many', function(req, res, next){ 
	res.render('many', { title: 'Many'});
});

router.get('/sound', function(req, res, next){ 
	res.render('sound', { title: 'Sound'});
});

router.get('/dust', function(req, res, next){ 
	res.render('dust', { title: 'Dust'});
});

router.get('/drag', function(req, res, next){ 
	res.render('drag', { title: 'Drag'});
});

router.get('/proton', function(req, res, next){ 
	res.render('proton', { title: 'Proton'});
});

router.get('/horizontal', function(req, res, next){ 
	res.render('horizontal', { title: 'Horizontal'});
});

router.get('/parallax', function(req, res, next){ 
	res.render('parallax', { title: 'Parallax'});
});

router.get('/partest', function(req, res, next){ 
	res.render('partest', { title: 'Partest'});
});

router.get('/slide', function(req, res, next){ 
	res.render('slide', { title: 'Slide'});
});

router.get('/tessera', function(req, res, next){ 
	res.render('tessera', { title: 'Tessera'});
});

module.exports = router;
