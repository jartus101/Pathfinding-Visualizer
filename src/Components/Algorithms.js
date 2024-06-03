
// User defined class
// to store element and its priority
class QElement {
    constructor(element, priority)
    {
        this.element = element;
        this.priority = priority;
    }
}
 
class PriorityQueue {
    constructor()
    {
        this.items = [];
    }
    
    enqueue(item, priority) {
        let qElement = new QElement(item, priority);

        this.items.push(qElement);
        //qelement is now at the end
        //bubble down to correct position
        for (let i = this.items.length - 1; i > 0; i--) {
            if (this.items[i].priority < this.items[i - 1].priority) {
                let temp = this.items[i];
                this.items[i] = this.items[i - 1];
                this.items[i - 1] = temp;
            } else {
                break;
            }
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return "empty";
        }
        return this.items.shift().element;
    }

    front() {
        if (this.isEmpty())
            return "empty";
        return this.items[0];
    }

    isEmpty() {
        return this.items.length == 0;
    }

    printPQueue() {
        console.log(this.items);
        return;
    }

    size() {
        return this.items.length;
    }

    includes(item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].element == item) {
                return true;
            }
        }
        return false;
    }
}

class DefaultMap {
    constructor(defaultValue) {
        return new Proxy({}, {
            get: (target, name) => name in target ? target[name] : defaultValue
        });
    }
}

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

function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function reconstructPath(closedSet, curr) {
    var path = [];
    while (curr !== undefined) {
        path.push(curr);
        curr = closedSet[curr];
    }
    path.reverse();
    return path;
}

export function AStar(grid, row, col, endx, endy) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    const openSet = new PriorityQueue();
    openSet.enqueue([row, col], 0);

    const cameFrom = {};

    const considered = [];

    const gScore = new DefaultMap(Infinity);
    gScore[[row, col]] = 0;

    var fScore = new DefaultMap(Infinity);
    fScore[[row, col]] = manhattanDistance(row, col, endx, endy);

    while (openSet.size() > 0) {
        let curr = openSet.dequeue();
        considered.push(curr);
        if (curr[0] == endx && curr[1] == endy) {
            return [reconstructPath(cameFrom, curr), considered];
        }

        for (let i = 0; i < directions.length; i++) {
            let currGScore = gScore[curr] + 1;
            let neighbor = [curr[0] + directions[i][0], curr[1] + directions[i][1]];
            if (!isValid(grid, new Set(), neighbor[0], neighbor[1])) {
                continue;
            }
            if (currGScore < gScore[neighbor]) {
                cameFrom[neighbor] = curr;
                gScore[neighbor] = currGScore;
                fScore[neighbor] = currGScore + manhattanDistance(neighbor[0], neighbor[1], endx, endy);
                if (!openSet.includes(neighbor)) {
                    openSet.enqueue(neighbor, fScore[neighbor]);
                }
            }
        }
    }
    
    return [[], considered];
}
