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
  var board = new Board({'n': n});
  
  
  for ( var index = 0; index < n; index++) {
    board.togglePiece(index, index);
  }

  // for (var row = 0; row < n; row++) {
  //   for (var col = 0; col < n; col++) {
  //     if (!board.get(row)[col]) {
  //       board.togglePiece(row, col);
  //       if (board.hasAnyRooksConflicts()) {
  //         board.togglePiece(row, col);
  //       }
  //     }
  //   }
  // }
  var solution = board.rows(); //fixme
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {

//   var board = new Board({'n': n});

//   var copyBoard = function (board) {
//     var newBoard = new Board( {'n': board.get('n')} );
//     var tempMatrix = board.rows().slice();
//     for (var row = 0; row < tempMatrix.length; row++) {
//       for ( var col = 0; col < tempMatrix[row].length; col++) {
//         if (tempMatrix[row][col]) {
//           newBoard.togglePiece(row, col);
//         }
//       }
//     }
//     return newBoard;
//   };
  
//   var placeRooks = function(board, row) {
//     var solCounter = 0;
//     board.children = [];
//     for (var col = 0; col < n; col++) {
//       // var boardCopy = Object.assign(board);
//       var boardCopy = copyBoard(board);
//       // boardCopy.rows = board.rows().slice();
//       boardCopy.togglePiece(row, col);
//       if (boardCopy.hasAnyRooksConflicts()) {
//         boardCopy.togglePiece(row, col);
//       } else {

//         board.children.push(boardCopy);
//       }
//     }
    
//     if (row === board.get('n') - 2) {
//       return board.children.length;
//     } else {
//       var sumChildren = 0;
//       for (var i = 0; i < board.children.length; i++) {
//         sumChildren += placeRooks(board.children[i], row + 1);
//       }
//       return sumChildren;
//     }

//     /////////////////////////////////////////////////change later
//   };
  
//   if (n === 1 || n === 0) {
//     return 1;
//   }
//   if (n === 2) {
//     return 2;
//   }
//   var solArr = []; 
//   var numSol = 0; 
//   for ( var i = 0; i < n; i++ ) {
//     solArr.push(new Board({'n': n}));
//     solArr[i].togglePiece(0, i);
//     numSol += placeRooks(solArr[i], 1);
//   }
  
  
  
//   // var solutionCount = undefined; //fixme

//   console.log('Number of solutions for ' + n + ' rooks:', numSol);
//   return numSol;
// };

window.countNRooksSolutions = function(n) {
  TreePath = function(path) {
    this.path = path || [];
    this.children = [];
  };
  var testCol = function(path, col) {
    for (var i = 0; i < path.length; i++) {
      if (path[i][1] === col) { return true; }
    }
    return false;
  };

  var firstPath = new TreePath();
  var recursive = function(row, treeNode) {
    var sumSolutions = 0;
    for (var col = 0; col < n; col++) {
      if (!testCol(treeNode.path, col)) {
        newTree = new TreePath(treeNode.path.slice());
        newTree.path.push([row, col]);
        if (newTree.path.length === n) {
          return 1;
        } else {
          sumSolutions += recursive(row + 1, newTree);
        }
      }
    }
    return sumSolutions;
  };
  return recursive(0, firstPath);
};

var copyBoard = function (board, n) {
  var newBoard = new Board({'n': n});
  var tempMatrix = board.rows().slice();
  for (var row = 0; row < tempMatrix.length; row++) {
    for ( var col = 0; col < tempMatrix[row].length; col++) {
      // debugger;
      if (tempMatrix[row][col]) {
        newBoard.togglePiece(row, col);
      }
    }
  }
  return newBoard;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // if (n === 0) { return [0]; }
  if ( n === 0 || n === 2 || n === 3) { 
    var board = new Board({'n': n}); 
    return board.rows();
  }
  var sumSolution = 0;
  var start = [0, 0];
  while (start[1] < n) {
    var board = new Board({'n': n});
    board.togglePiece(start[0], start[1]);
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if (!board.get(row)[col]) {
          board.togglePiece(row, col);
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(row, col);
          }
        }
      }
    }
    var solution = board.rows();
    sumSolution = _.reduce(solution, function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);
    if (sumSolution === n) {
      return solution;
    }

    if (start[1] >= n - 1) {
      start[0] += 1;
      start[1] = 0;
    } else {
      start[1] += 1;
    }
  } //fixme
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {



  var board = new Board({'n': n});

  var copyBoard = function (board) {
    var newBoard = new Board( {'n': board.get('n')} );
    var tempMatrix = board.rows().slice();
    for (var row = 0; row < tempMatrix.length; row++) {
      for ( var col = 0; col < tempMatrix[row].length; col++) {
        if (tempMatrix[row][col]) {
          newBoard.togglePiece(row, col);
        }
      }
    }
    return newBoard;
  };
  
  var placeQueens = function(board, row) {
    var solCounter = 0;
    board.children = [];
    for (var col = 0; col < n; col++) {
      // var boardCopy = Object.assign(board);
      var boardCopy = copyBoard(board);
      // boardCopy.rows = board.rows().slice();
      boardCopy.togglePiece(row, col);
      if (boardCopy.hasAnyQueensConflicts()) {
        boardCopy.togglePiece(row, col);
      } else {
        board.children.push(boardCopy);
      }
    }
    

    if (row === board.get('n') - 1) {
      return board.children.length;
    } else {
      var sumChildren = 0;
      for (var i = 0; i < board.children.length; i++) {
        sumChildren += placeQueens(board.children[i], row + 1);
      }
      return sumChildren;
    }

    /////////////////////////////////////////////////change later
  };
  
  if (n === 1 || n === 0) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }
  var solArr = []; 
  var numSol = 0; 
  for ( var i = 0; i < n; i++ ) {
    solArr.push(new Board({'n': n}));
    solArr[i].togglePiece(0, i);
    numSol += placeQueens(solArr[i], 1);
  }
  
  
  
  // var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', numSol);
  return numSol;

/***********************************************************************/



  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// window.countNQueensSolutions = function(n) {



//   var board = new Board({'n': n});

//   var copyBoard = function (board) {
//     var newBoard = new Board( {'n': board.get('n')} );
//     var tempMatrix = board.rows().slice();
//     for (var row = 0; row < tempMatrix.length; row++) {
//       for ( var col = 0; col < tempMatrix[row].length; col++) {
//         if (tempMatrix[row][col]) {
//           newBoard.togglePiece(row, col);
//         }
//       }
//     }
//     return newBoard;
//   };
  
//   var placeQueens = function(board, row) {
    
//     var sumChildren = 0;
//     board.children = [];
//     for (var col = 0; col < n; col++) {
      
//       var boardCopy = copyBoard(board);
//       boardCopy.togglePiece(row, col);
      
//       if (boardCopy.hasAnyQueensConflicts()) {
//         //Turns piece off
//         boardCopy.togglePiece(row, col);

//       } else if (row >= board.get('n') - 1) {
//         //solution has been found
//         console.log(console.log(JSON.stringify(boardCopy.rows())));
//         return 1; //board.children.length;

//       } else {
//         //solution not found, recurse through next row
//         board.children.push(boardCopy);
      
//         for (var i = 0; i < board.children.length; i++) {
//           sumChildren += placeQueens(board.children[i], row + 1);
//           // console.log('sumChildren', sumChildren);
//         }
//       }



//     }
//     return sumChildren;
//   };
  
//   if (n === 1 || n === 0) {
//     return 1;
//   }
//   if (n === 2 || n === 3) {
//     return 0;
//   }
//   var solArr = []; 
//   var numSol = 0; 

//   numSol += placeQueens(new Board({'n': n}), 0);
  
  
  
//   // var solutionCount = undefined; //fixme

//   console.log('Number of solutions for ' + n + ' Queens:', numSol);
//   return numSol;
// };