/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cosine = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-cosine-distance', function tests() {

	it( 'should export a function', function test() {
		expect( cosine ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided two arrays', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i], [ 1, 2, 3 ] ) ).to.throw( TypeError );
			expect( badValue( [ 1, 2, 3 ], values[i] ) ).to.throw( TypeError );
		}
		function badValue( val1, val2 ) {
			return function() {
				cosine( val1, val2 );
			};
		}
	});


	it( 'should throw an error if provided an accessor argument which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cosine( [ 2, 3, 4 ], [ 3, 1, 2 ], value );
			};
		}
	});

	it( 'should throw an error if the two input arguments are not the same length', function test() {
		expect( badValue( [ 2, 3, 4, 5, 1 ], [ 3, 2, 1, 2] ) ).to.throw( Error );
		function badValue( val1, val2 ) {
			return function() {
				cosine( val1, val2 );
			};
		}
	});

	it( 'should return null if provided empty arrays', function test() {
		assert.isNull( cosine( [], [] ) );
	});

	it( 'should compute the cosine distance', function test() {
		var dat1, dat2, expected, actual;

		dat1 = [ 2, 4, 5, 3, 8, 2 ];
		dat2 = [ 3, 1, 5, 3, 7, 2 ];
		actual =  cosine( dat1, dat2 );
		expected = 0.04397873;

		assert.ok( Math.abs( actual - expected ) < 1e-5 );

	});

	it( 'should compute the cosine distance using an accessor function', function test() {
		var dat1, dat2, expected, actual;

		dat1 = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		dat2 = [
			[1,3],
			[2,1],
			[3,5],
			[4,3],
			[5,7],
			[6,2]
		];

		actual = cosine( dat1, dat2, getValue );
		expected = 0.04397873;

		assert.ok( Math.abs( actual - expected ) < 1e-5 );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			}
			return d[ 1 ];
		}
	});


});
