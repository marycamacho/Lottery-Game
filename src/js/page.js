/**
 * Created by mary on 04/16/2016.
 */

/*$(function(){

    $(".goal-display").each(function() {

        var this$ = $(this);
        var numberSquares = this$.data().showSquares;
        var controlName = this$.data().name;
        var goalType = this$.data().goalType;

        this$.append('<h3>' + this$.data().title + '</h3>');

        // commented code here is to add display based on over/under
        //if(goalType == "over") {
            for (var i = 0; i < numberSquares; i++) {
                this$.append('<div data-cell="' + controlName + (i + 1) + '" class="pull-left square"></div>');
            }
        /!*} else {
            this$.append('<div data-cell="' + controlName + (i + 1) + '" class="pull-left square"></div>');
        }*!/

    });

    var data = getData();
    var allSquares$ = $(".square");

    function paintSquares(){
        allSquares$.each(function () {
            var this$ = $(this);
            var cellID = this$.data().cell;
            if (data[cellID]) {
                if (data[cellID] == 1) {
                    this$.addClass('single');
                } else {
                    this$.addClass('double');
                }
            }
        });
    }

    paintSquares();

    $('#resetBtn').click(function(){
        allSquares$.removeClass('single').removeClass('double');
        data=resetData();
        paintSquares();
    });

    allSquares$.click(function () {
        var this$ = $(this);
        var cellID = this$.data().cell;
        var goalType = this$.data().goalType;
        var controlName = this$.data().name;

        if (this$.hasClass('single')){
            this$.addClass('double').removeClass('single');
            data[cellID] = 2;
        } else if (this$.hasClass('double')){
            this$.removeClass('double');
            data[cellID] = 0;

        } else {
            this$.addClass('single');
            data[cellID] = 1;
        }

        saveData(data);
        });
});*/

