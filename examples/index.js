'use strict';

var cosine = require( './../lib' );

var c = [ 5, 23, 2, 5, 9 ],
    d = [ 3, 21, 2, 5, 14 ];

var dist = cosine( c, d );
console.log(dist);
