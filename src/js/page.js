/**
 * Created by mary on 04/16/2016.
 */

$(function(){
    var pickedNumbers = [];
    var randomNumbers = [];
    var balanceAmt = 10;
    var recordScore = 0;

    //display beginning balance and record winnings and handlePlayButton
    $('.balance').text(balanceAmt);
    $('.currentWinnings').text(0);

    // function that checks localStorage and if there is a value, tests if it is greater than the current balanceAmt, and paint the higher value to page as record score.
    function highScore () {
        var storedRecordScore = parseFloat(localStorage.getItem("recordScoreData"));
        if (storedRecordScore > recordScore) {
            recordScore = storedRecordScore;
        }
        if (recordScore < balanceAmt) {
            recordScore = balanceAmt;
        }
        $('.recordScore').text(recordScore);
    }

    //run functions for setting state of recordScore and Play Button
    highScore();
    handlePlayButton();

    //everything that happens when the user clicks on one of the numbers in the boxes
    $(".num-select").click(function () {
        var this$ = $(this);
        var child$ = this$.children();
        var pickedNum = child$.data().num;

        // boxes change colors until 4 numbers are selected at which point error is displayed
        if (child$.hasClass('num-box-green')) {
            if($('.num-box-yellow').length < 4) {
                child$.addClass('num-box-yellow').removeClass('num-box-green');
                pickedNumbers.push(pickedNum);
            } else {
                alert("You can only select 4 numbers. If you want a different number, unselect one of your numbers and pick a different one.");
            }
        } else {
            child$.addClass('num-box-green').removeClass('num-box-yellow');
            var removeIndex = pickedNumbers.indexOf(pickedNum);
            if (removeIndex > -1) {
                pickedNumbers.splice(removeIndex, 1);
            }
        }
        paintPickedNums();
        handlePlayButton();

        //saveData(data);
    });

    //paint the picked numbers on the first row of white balls
    function paintPickedNums () {
        $('.numPicks .ball').text('');
        $.each(pickedNumbers, function(index, value) {
            $('.numPicks .pickedIndex'+index).text(value);
        });
    }
    // function that sets state of play button
    function handlePlayButton () {
        var allPlay$ = $(".play");
        if (balanceAmt >= 2 && pickedNumbers.length == 4) {
            allPlay$.addClass('playButton').removeClass('playButtonGrey');
        } else {
            allPlay$.addClass('playButtonGrey').removeClass('playButton');
        }
    }
    
    // everything that happens when user clicks play now button
    $(".play").click(function () {
        if (! $(this).hasClass('playButton')) {
            return
        }
        // clear old number from house balls and random array
        $('.numRandoms .ball').text('');

        // deduct $2 from balance for playing game
        balanceAmt = balanceAmt - 2;
        $('.balance').text(balanceAmt);

        // function to add spin class to balls
        function startSpin () {
            var spinBall$ = $(".numRandoms .ball");
            spinBall$.addClass('spin');
        }

        // function to remove spin class
        function stopSpin () {
            var spinBall$ = $(".numRandoms .ball");
            spinBall$.removeClass('spin');
        }

        // randomly calculate a number min and max inclusive
        function randomGenerator (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //painting numbers into balls for random selected numbers
        function paintRandomNums () {
            $('.numRandoms .ball').text('');
            $.each(randomNumbers, function(index, value) {
                $('.numRandoms .pickedIndex'+index).text(value);
            });
        }

        //create jquery selector var for displaying random winning numbers and reset the random number array
        var pickRandom$ = $(".numRandoms .ball");
        randomNumbers = [];


        // upon click, pick the random numbers by runing the random generator and push values to the array.
        pickRandom$.each(function (index, el) {
            var pickedRandomNumber = randomGenerator(1,10);
            randomNumbers.push(pickedRandomNumber);
        });
        //after a timeout period, run random number generator and populate the array, then paint numbers into winning display, then calculate the winnings and update the balance, the winnings and the record where appropriate.


        // run startSpin function
        startSpin();
        setTimeout(function(){

            paintRandomNums();

            var winnings = calculateWinnings();
            $('.currentWinnings').text(winnings);


            // calculate and display new balance

            if(winnings > 0) {
                balanceAmt = balanceAmt + winnings;
                $('.balance').text(balanceAmt);
            }

            if (balanceAmt > recordScore) {
                recordScore = balanceAmt;
                $('.recordScore').text(recordScore);
                // update recordScore to localStorage
                localStorage.setItem("recordScoreData", recordScore);
            }

            //stop spin function
            stopSpin();
        }, 2500);



        // function that compare arrays of numbers (picked & random):  for each picked number, analyze if it is in the random array. For every one that is a yes, calculate and sum winnings.

        function calculateWinnings (){
            var countOfMatches = 0;
            for (var i = 0; i < pickedNumbers.length; i++) {
                if(randomNumbers.indexOf(pickedNumbers[i]) > -1) {
                    countOfMatches++;
                }
            }

            //calculate winnings for ticket - if 0 wins, return 0 winnings
            //decided to give more
            if(countOfMatches == 0){
                return 0;
            } else {
                return Math.pow(2,countOfMatches);
            }
        }
    });


});




