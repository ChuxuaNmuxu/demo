import React from 'react';
import ReactDom from 'react-dom';
import App from 'component/app';

var pathToRegexp = require('path-to-regexp');
var re = pathToRegexp('/(editor|editor/.*|courseEntry)?')
// keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]
 
const result = re.exec('/edito');
//=> ['/test/route', 'test', 'route']
console.log('result: ', result)


const root = document.getElementById('root');
ReactDom.render(<App />, root);
