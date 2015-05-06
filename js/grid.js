//function creates full 2D Array 
//currently it is 3x3 with each object having a position
// x and y both increase by 5 and we will need to figure out actual sizes for this later
var currentGrid = [];

(function () {
    function makeRow(x, y) {
        var row = [];
        for (var j = 0; j < 3; j++) {
            //create position and add to row array
            var position = { x: x, y: y };
            row.push(position);
            x += 5;
        }

        //return one row of values with x at 0,5, and 10
        return row;
    }

    var x = 0, y = 5;

    //creates the 3 columns by adding 3 rows to the array
    for (var i = 0; i < 3; i++) {
        var addRow = makeRow(x, y);

        currentGrid.push(addRow);

        y += 5;
    }

    //prints out full grid
    console.log(currentGrid);
})()