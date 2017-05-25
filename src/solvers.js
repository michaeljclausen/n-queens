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
  var solution;

  var generateSolutions = function(rooksToPlace, boardSoFar, columnsAlreadyChosen = []) {
    if (!solution) {
      if (boardSoFar === undefined) {
        var boardSoFar = new Board({n: rooksToPlace});
      }
      if (rooksToPlace === 0) {
        if (!boardSoFar.hasAnyRooksConflicts()) {
          solution = boardSoFar.rows();
        }
        return;
      }
      for (var i = 0; i < n; i++) {
        if (!columnsAlreadyChosen.includes(i)) {
          boardSoFar.togglePiece(rooksToPlace - 1, i);
          columnsAlreadyChosen.push(i);
          generateSolutions(rooksToPlace - 1, boardSoFar, columnsAlreadyChosen);
          if (!solution) {
            columnsAlreadyChosen.pop();
            boardSoFar.togglePiece(rooksToPlace - 1, i);
          }
        }
      }   
    }
  };

  generateSolutions(n);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
    
  var solutionArray = [];
  
  var generateSolutions = function(rooksToPlace, boardSoFar, columnsAlreadyChosen = []) {
    if (boardSoFar === undefined) {
      var boardSoFar = new Board({n: rooksToPlace});
    }
    if (rooksToPlace === 0) {
      if (!boardSoFar.hasAnyRooksConflicts()) {
        solutionArray.push(boardSoFar);
      }
      return;
    }
 
    for (var i = 0; i < n; i++) {
      if (!columnsAlreadyChosen.includes(i)) {
        boardSoFar.togglePiece(rooksToPlace - 1, i);
        columnsAlreadyChosen.push(i);
        generateSolutions(rooksToPlace - 1, boardSoFar, columnsAlreadyChosen);
        columnsAlreadyChosen.pop();
        boardSoFar.togglePiece(rooksToPlace - 1, i);
      }
    }   
  };
  
  generateSolutions(n);
  return solutionArray.length;







  // let solutionCoount = 'fix me';
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
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
