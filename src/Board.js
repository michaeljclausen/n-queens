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

    cols: function() {
      return _(_.range(this.get('n'))).map(function(colIndex) {
        var rows = this.rows();
        var colArray = [];
        for (var j = 0; j < rows[colIndex].length; j++) {
          colArray.push(rows[j][colIndex]);
        }
        return colArray;
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
    hasRowConflictAt: function(rowIndex) {
      // access the specific row of array
      var rowArray = this.rows()[rowIndex];
      var count = 0;
      // iterate though each value in row, 
      for (var i = 0; i < rowArray.length; i++) {
        // if value is 1 then increase count
        if (rowArray[i] === 1) {
          count++;
        }
      }
      // return true if count > 1
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // access array of rows
      var rowsArray = this.rows();
      // iterate through array of rows, call hasRowConflictAt() to check for conflict
      for (var i = 0; i < rowsArray.length; i++) {
        // if any of hasRowConflictAt() returns true, then return true for this function
        if (this.hasRowConflictAt(i) === true) {
          return true;
        }
        // else return false
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
          // access the specific row of array
      var colsArray = this.cols()[colIndex];
      var count = 0;
      // iterate though each value in row, 
      for (var i = 0; i < colsArray.length; i++) {
        // if value is 1 then increase count
        if (colsArray[i] === 1) {
          count++;
        }
      }
      // return true if count > 1
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // access array of rows
      var colsArray = this.cols();
      // iterate through array of cols, call hasRowConflictAt() to check for conflict
      for (var i = 0; i < colsArray.length; i++) {
        // if any of hasRowConflictAt() returns true, then return true for this function
        if (this.hasColConflictAt(i) === true) {
          return true;
        }
        // else return false
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // iterate through every value in board
      var rowsArray = this.rows();
      var diagArray = [];
      var count = 0;
      for (var i = 0; i < rowsArray.length; i++) {
        for (var j = 0; j < rowsArray[i].length; j++) {
          // if output of helper function matches the argument
          if (this._getFirstRowColumnIndexForMajorDiagonalOn(i, j) === majorDiagonalColumnIndexAtFirstRow) {
            diagArray.push(rowsArray[i][j]);
          }
        }
      }

      // iterate through DiagArray 
      for (var a = 0; a < diagArray.length; a++) {
        // count the number of 1s
        if (diagArray[a] === 1) {
          count++;
        }
      }
      return count > 1;
      // if the count > 1 return true, else return false
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // num of diag = 2n -3 
      // start of index of diagonalNames = -(((2n-3)-1)/2)
      
      var numOfDiag = (2 * this.get('n')) - 3;
      var startOfIndex = -1 * ((numOfDiag - 1) / 2);
      var endOfIndex = -1 * startOfIndex;
      
      for (var i = startOfIndex; i < endOfIndex; i++) {
        if (this.hasMajorDiagonalConflictAt(i) === true) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      debugger;
      var rowsArray = this.rows();
      var diagArray = [];
      var count = 0;
      for (var i = 0; i < rowsArray.length; i++) {
        for (var j = 0; j < rowsArray[i].length; j++) {
          // if output of helper function matches the argument
          if (this._getFirstRowColumnIndexForMinorDiagonalOn(i, j) === minorDiagonalColumnIndexAtFirstRow) {
            diagArray.push(rowsArray[i][j]);
          }
        }
      }

      // iterate through DiagArray 
      for (var a = 0; a < diagArray.length; a++) {
        // count the number of 1s
        if (diagArray[a] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // num of diag = 2n - 3
      // start of Diag Index = 1
      // end of Diag Index = 2n - 3
      var numOfDiag = (2 * this.get('n')) - 3;
      var startOfIndex = 1;
      var endOfIndex = numOfDiag;
      
      for (var i = startOfIndex; i <= endOfIndex; i++) {
        if (this.hasMinorDiagonalConflictAt(i) === true) {
          return true;
        }
      }
      return false;
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
