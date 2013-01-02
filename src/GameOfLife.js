function getNeighbours(grid, row, column){
  var neighbours = [];
  for(var row_counter=-1;row_counter<=1; row_counter++){
    for(var column_counter=-1;column_counter<=1; column_counter++){
      try {
        var cell = grid[row+row_counter][column+column_counter]
        neighbours.push(cell);
      } catch(err) {}
    }
  }

  return neighbours.filter(function(cell){return cell && cell != grid[row][column]});
}

function updateGrid(grid){
  var newgrid = []; // copy array
  for(var row_counter=0;row_counter<grid.length; row_counter++){
    newgrid[row_counter] = [];
    for(var column_counter=0;column_counter<grid[row_counter].length; column_counter++){
      var neighbours = getNeighbours(grid, row_counter, column_counter);
      var alive_neighbours = neighbours.filter(function(cell){return cell.alive}).length
      newgrid[row_counter][column_counter] = {"row":row_counter, "column": column_counter, "alive":grid[row_counter][column_counter].alive};
      if( alive_neighbours < 2 || alive_neighbours > 3){
        newgrid[row_counter][column_counter].alive = false;
      } 
      else if (alive_neighbours == 3) {
        newgrid[row_counter][column_counter].alive = true;
      }
    }
  }
  
  return newgrid;
}

function run(grid) {
  grid=updateGrid(grid);
  for(var row_counter=0;row_counter<grid.length; row_counter++){
    for(var column_counter=0;column_counter<grid[row_counter].length; column_counter++){
      var cell = grid[row_counter][column_counter];
      var celltd = $("#"+row_counter+"-"+column_counter);
      celltd.removeClass("dead");
      if (!cell.alive)
        celltd.addClass("dead");
    }
  }
  return grid
}