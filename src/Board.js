// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    //Does it check if there are two?
    hasRowConflictAt: function(rowIndex) {
      for (var colIndex = 0; colIndex < this.get('n'); colIndex++) {
        //console.log('test for Row:', this.get(rowIndex));
         if (this.get(rowIndex)[colIndex] === 1){
          for (var collisionIndex = colIndex+1; collisionIndex < this.get('n'); collisionIndex++){
            if (this.get(rowIndex)[collisionIndex] === 1){
              return true;
            }
          }
         }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      for (var rowIndex = 0; rowIndex < this.get('n'); rowIndex++) {
        if(this.hasRowConflictAt(rowIndex)){
          return true;
        };
      } 
      return false; // fixme
      // for (var rowIndex = 0; rowIndex < this.get('n'); rowIndex++) {
      //   for (var colIndex = 0; colIndex < this.get('n'); colIndex++) {
      //     //console.log('test for Row:', this.get(rowIndex));
      //     if (this.get(rowIndex)[colIndex] === 1) {
      //       for (var collisionIndex = colIndex+1; collisionIndex < this.get('n'); collisionIndex++) { 
      //         if (this.get(rowIndex)[collisionIndex] === 1) {
      //           return true;
      //         }
      //       }
      //     }
      //   } 
      // } 
      // return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      for (var rowIndex = 0; rowIndex < this.get('n'); rowIndex++) {
        //console.log('test for Row:', this.get(rowIndex));
         if (this.get(rowIndex)[colIndex] === 1){
          for (var collisionIndex = rowIndex+1; collisionIndex < this.get('n'); collisionIndex++){
            if (this.get(collisionIndex)[colIndex] === 1){
              return true;
            }
          }
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var colIndex = 0; colIndex < this.get('n'); colIndex++) {
        if(this.hasColConflictAt(colIndex)) {
          return true;
        }
      } 
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      if ( majorDiagonalColumnIndexAtFirstRow >= 0){
        rowsToTest = this.get('n') - majorDiagonalColumnIndexAtFirstRow;
      } else {
        rowsToTest = this.get('n');
      }
      for (var rowIndex = 0; rowIndex < rowsToTest; rowIndex++) {
        if(majorDiagonalColumnIndexAtFirstRow >= 0){
          if (this.get(rowIndex)[majorDiagonalColumnIndexAtFirstRow]){
            for (var collisionIndex = rowIndex+1; collisionIndex < rowsToTest; collisionIndex++ ) {
              majorDiagonalColumnIndexAtFirstRow++;
              if (this.get(collisionIndex)[majorDiagonalColumnIndexAtFirstRow]) {
                return true;
              }
            }
            return false;
          }
        }
        majorDiagonalColumnIndexAtFirstRow++;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var colIndex = -(this.get('n')-1); colIndex < this.get('n'); colIndex++ ) {
        if (this.hasMajorDiagonalConflictAt(colIndex)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      if ( minorDiagonalColumnIndexAtFirstRow >= this.get('n')){
        rowsToTest = this.get('n'); 
      } else {
        rowsToTest = minorDiagonalColumnIndexAtFirstRow+1;
      }
      
      for (var rowIndex = 0; rowIndex < (rowsToTest); rowIndex++) {
        if ( minorDiagonalColumnIndexAtFirstRow < this.get('n')){
          if (this.get(rowIndex)[minorDiagonalColumnIndexAtFirstRow]){
            for (var collisionIndex = rowIndex+1; collisionIndex < (rowsToTest); collisionIndex++ ) {
              minorDiagonalColumnIndexAtFirstRow--;
              if (this.get(collisionIndex)[minorDiagonalColumnIndexAtFirstRow]) {
                return true;
              }
            }
            //return false;
          }
        }
        minorDiagonalColumnIndexAtFirstRow--;
        //this could be problematic down the road, but it should actually only do a check once
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var colIndex = 0; colIndex < (2*this.get('n') - 1); colIndex++) {
        if (this.hasMinorDiagonalConflictAt(colIndex)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
