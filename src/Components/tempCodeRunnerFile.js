// Direction vectors
var dRow = [-1, 0, 1, 0];
var dCol = [0, 1, 0, -1];

// Function to check if a cell is valid or not
function isValid(grid, vis, row, col) {
    const ROW = grid.length;
    const COL = grid[0].length;

    // If cell lies out of bounds
    if (row < 0 || col < 0 || row >= ROW || col >= COL)
        return false;

    // If cell is already visited
    if (vis.has(row+","+col))
        return false;

    // If cell is blocked
    if (grid[row][col] == 1) {
        return false;
    }

    // Otherwise
    return true;
}

// Function to perform the BFS traversal
function BFS(grid, row, col) {
    const ROW = grid.length;
    const COL = grid[0].length;

    var path = {};
    // Stores indices of the matrix cells
    var q = [];

    var vis = new Set();

    // Mark the starting cell as visited and push it into the queue
    q.push([row, col]);
    vis.add(row+","+col)

    // Iterate while the queue is not empty
    while (q.length != 0) {
        var cell = q.shift();
        var x = cell[0];
        var y = cell[1];

        // If we have reached the end cell
        if (x == ROW - 1 && y == COL - 1) {
            var output = [];
            var coord = String(ROW - 1) + "," + String(COL - 1);
            output.push(coord);
            while (coord != row + "," + col) {
                output.push(path[coord]);
                coord = path[coord];
            }
            output.push(row + "," + col);
            output.reverse();
            uniq = [...new Set(output)];
            return [uniq, Array.from(vis)];
        }

        // Go to the adjacent cells
        for (var i = 0; i < 4; i++) {
            var adjx = x + dRow[i];
            var adjy = y + dCol[i];

            if (isValid(grid, vis, adjx, adjy)) {
                q.push([adjx, adjy]);
                vis.add(adjx+","+adjy)
                path[adjx + "," + adjy] = x + "," + y;
            }
        }
    }
    return Array.from(vis);
}

// Driver Code
// Given input matrix
var grid = [
    [0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
];

// Call BFS 
console.log(BFS(grid, 0, 0));
