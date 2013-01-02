describe("GameOfLife", function() {
  beforeEach(function(){
    grid = [];
    for(row_counter=0;row_counter<5; row_counter++){
      grid.push([]);
      for(column_counter=0;column_counter<5; column_counter++){
        grid[row_counter].push({"row":row_counter, "column": column_counter, "alive":false});
      }
    }
  });

  describe("#updateGrid", function(){
    it("does a simple oscolation", function(){
      var gridcopy = [];
      for(row_counter=0;row_counter<5; row_counter++){
        gridcopy.push([]);
        for(column_counter=0;column_counter<5; column_counter++){
          gridcopy[row_counter].push({"row":row_counter, "column": column_counter, "alive":false});
        }
      }

      grid[2][1].alive = true;
      grid[2][2].alive = true;
      grid[2][3].alive = true;
      var newGrid = updateGrid(grid);

      gridcopy[1][2].alive = true;
      gridcopy[2][2].alive = true;
      gridcopy[3][2].alive = true;
      expect(newGrid).toEqual(gridcopy);
    });
  });

  describe("#getNeighbours", function(){
    it("knows the neighbours of a cell in the middle of the grid", function(){
      neighbours = getNeighbours(grid, 2, 2);
      expect(neighbours).toEqual([{"row":1, "column": 1, "alive":false},
                                  {"row":1, "column": 2, "alive":false},
                                  {"row":1, "column": 3, "alive":false},
                                  {"row":2, "column": 1, "alive":false},
                                  {"row":2, "column": 3, "alive":false},
                                  {"row":3, "column": 1, "alive":false},
                                  {"row":3, "column": 2, "alive":false},
                                  {"row":3, "column": 3, "alive":false}])
    });

    it("knows the neighbours of a cell on a top or left edge", function(){
      neighbours = getNeighbours(grid, 0, 0);
      expect(neighbours).toEqual([{"row":0, "column": 1, "alive":false},
                                  {"row":1, "column": 0, "alive":false},
                                  {"row":1, "column": 1, "alive":false}])
    });

    it("knows the neighbours of a cell on a bottom or right edge", function(){
      neighbours = getNeighbours(grid, 4, 4);
      expect(neighbours).toEqual([{"row":3, "column": 3, "alive":false},
                                  {"row":3, "column": 4, "alive":false},
                                  {"row":4, "column": 3, "alive":false}])
    });
  });

  describe("#killForUnderPopulation", function(){
    it("kills a cell that doesnt have two alive neighbours", function(){
      grid[0][0].alive = true;
      grid[1][0].alive = true;

      var newGrid = updateGrid(grid);
      expect(newGrid[0][0].alive).toBe(false);
    });

    it("lets a cell live if has two or more alive neighbours", function(){
      grid[0][0].alive = true;
      grid[0][1].alive = true;
      grid[1][0].alive = true;

      var newGrid = updateGrid(grid);
      expect(newGrid[0][0].alive).toBe(true);
    })
  });
});