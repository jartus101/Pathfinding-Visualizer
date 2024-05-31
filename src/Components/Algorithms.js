// Convert coordinates in string format to list of integers
function coordsToLists(list) {
    return list.map((str) => {
        return str.split(",").map(Number);
    });
}

// Function to check if a cell is valid or not
function isValid(grid, vis, row, col) {
    const ROW = grid.length;
    const COL = grid[0].length;

    // If cell lies out of bounds
    if (row < 0 || col < 0 || row >= ROW || col >= COL)
        return false;

    // If cell is already visited
    if (vis.has(row + "," + col))
        return false;

    // If cell is blocked
    if (grid[row][col] == 1) {
        return false;
    }

    // Otherwise
    return true;
}

// Function to perform the BFS traversal
export function BFS(grid, row, col, endx, endy) {
    var dRow = [-1, 0, 1, 0];
    var dCol = [0, 1, 0, -1];

    const ROW = grid.length;
    const COL = grid[0].length;

    var path = {};
    // Stores indices of the matrix cells
    var q = [];

    var vis = new Set();
    // Mark the starting cell as visited and push it into the queue
    q.push([row, col]);
    vis.add(row + "," + col);

    let endReached = false;

    // Iterate while the queue is not empty
    while (q.length != 0) {
        var cell = q.shift();
        var x = cell[0];
        var y = cell[1];

        // If we have reached the end cell
        if (x == endx && y == endy) {
            var output = [];
            var coord = String(endx) + "," + String(endy);
            while (coord !== undefined) {
                output.push(coord);
                coord = path[coord];
            }
            output.reverse();
            return [coordsToLists(output), coordsToLists(Array.from(vis))];
        }

        // Go to the adjacent cells
        for (var i = 0; i < 4; i++) {
            var adjx = x + dRow[i];
            var adjy = y + dCol[i];

            if (isValid(grid, vis, adjx, adjy) && !endReached) {
                q.push([adjx, adjy]);
                vis.add(adjx + "," + adjy);
                path[adjx + "," + adjy] = x + "," + y;

                if (adjx == endx && adjy == endy) {
                    endReached = true;
                }
            }
        }
    }
    return [[], coordsToLists(Array.from(vis))];
}

export function DFS(grid, row, col, endx, endy) {
    const ROW = grid.length;
    const COL = grid[0].length;

    // Direction vectors for moving up, right, down, and left
    var dRow = [0, 1, 0, -1];
    var dCol = [-1, 0, 1, 0];

    var vis = new Set();
    var st = [];
    var endReached = false;
    st.push([[row, col], []]); // stack now stores pairs of current cell and the path leading to it

    while (st.length != 0) {
        var [curr, path] = st.pop();
        var row = curr[0];
        var col = curr[1];

        if (!isValid(grid, vis, row, col))
            continue;

        vis.add(row + "," + col);
        path.push([row, col]);

        if (row == endx && col == endy) {
            return [path, coordsToLists(Array.from(vis))];
        }

        // Push all the adjacent cells
        for (var i = 0; i < 4; i++) {
            var adjx = row + dRow[i];
            var adjy = col + dCol[i];
            st.push([[adjx, adjy], [...path]]);
        }
    }

    return [[], Array.from(vis)]; // return an empty path if there is no valid path
}

var grid = [[0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 1],
            [0, 1, 0, 0]]
// Function call
console.log(DFS(grid, 0, 0, 3, 3));