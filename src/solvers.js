/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  
  
  
  
  
  
  
  
  var solution = undefined; //fixme
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  // for a combination of board size 1->n
  
  // var board = new Board({n: n});
  // var count = 0;
  // var piecesToPlace = n;
  //   // place a piece on the board 
  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     // keep placing pieces on the board until n pieces have been placed
  //     // check if theres no conflict
  //     // if there is no conflict, push to solutionArray   
  //     if (piecesToPlace > 0 && this.get(i)[j] !== 1) {
  //       this.togglePiece(i, j);
  //     }
  //     if (piecesToPlace === 0) {
  //       if (this.hasAnyRooksConflicts === true) {
  //         count++;
  //       }
  //       piecesToPlace--;
  //     } 
  //   }
  // }
  
  // return count;
  var f = [];
  function factorial (n) {
    if (n == 0 || n == 1)
      return 1;
    if (f[n] > 0)
      return f[n];
    return f[n] = factorial(n-1) * n;
  }
  
  
  
  
  var solutionCount = factorial(n); //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
