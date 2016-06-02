'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastfm = function lastfm(api_key, resource, method, params, callback) {
	var prependAndKeyEquals = _ramda2.default.mapObjIndexed(function (value, key, object) {
		return '&' + key + '=' + value;
	});
	var add = function add(a, b) {
		return a + b;
	};
	var paramStr = _ramda2.default.compose(_ramda2.default.reduce(add, ''), _ramda2.default.values, prependAndKeyEquals);
	var queryStr = 'http://ws.audioscrobbler.com/2.0/?api_key=' + api_key + '&method=' + resource + '.' + method + paramStr(params);
	_http2.default.get(queryStr, function (res) {
		var body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function () {
			callback(JSON.parse(body), null);
		});
	}).on('error', function (err) {
		callback(null, err);
	});
};

var curryfm = _ramda2.default.curry(lastfm);
exports.default = curryfm;
