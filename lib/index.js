'use strict';

// MODULES //

var dot = require( 'compute-dot' ),
	l2norm = require( 'compute-l2norm' ),
	isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' );

// FUNCTIONS //


/**
 * FUNCTION: partial( fn, j )
 *		partial function application from the right
 *
 * @param {Function} fn - input function
 * @param {Number} j - array index to be applied
 * @returns {Function} partially applied function
 */

function partial( fn, j ) {
	return function( d, i ) {
		return fn.call( this, d, i, j );
	};
}

/**
* FUNCTION: cosine( x, y[, accessor] )
* 		calculates the Cosine distance between n-dimensional vectors
*
* @param {Array} x - array
* @param {Array} y - array
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number} Cosine distance
*/
function cosine( x, y, clbk ) {

	var sim;

	if ( !isArray(x) ) {
		throw new TypeError( 'cosine()::invalid input argument. x argument must be a number array. Value: `' + x + '`.' );
	}

	if ( !isArray(y) ) {
		throw new TypeError( 'cosine()::invalid input argument. y argument must be a number array. Value: `' + y + '`.' );
	}

	if ( x.length !== y.length ) {
		throw new TypeError( 'cosine()::invalid input arguments. x and y must have the same length' );
	}

	// in case of empty arrays, return null
	if ( x.length === 0 ) {
		return null;
	}

	if ( arguments.length > 2 ) {
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'cosine()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}

	if ( clbk ) {
		sim = dot( x, y, clbk ) / ( l2norm( x, partial( clbk, 0 ) ) * l2norm( y, partial( clbk, 1 ) ) );
	} else {
		sim = dot( x, y ) / ( l2norm( x ) * l2norm( y ) );
	}

	return 1 - sim;

} // end FUNCTION cosine()


// EXPORTS //

module.exports = cosine;
