'use strict';

// MODULES //

var similarity = require( 'compute-cosine-similarity');


// COSINE DISTANCE //

/**
* FUNCTION: distance( x, y[, accessor] )
*	Computes the cosine distance between two arrays.
*
* @param {Number[]|Array} x - input array
* @param {Number[]|Array} y - input array
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number|Null} Cosine distance
*/
function distance( x, y, clbk ) {
	var s;
	if ( arguments.length > 2 ) {
		s = similarity( x, y, clbk );
	} else {
		s = similarity( x, y );
	}
	return ( s !== null ) ? 1 - s : s;
} // end FUNCTION distance()


// EXPORTS //

module.exports = distance;
