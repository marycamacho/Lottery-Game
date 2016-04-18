/**
 * Created by mary on 04/16/2016.
 */

$(function(){
    var pickedNumbers = [];
    var randomNumbers = [];
    var balanceAmt = 10;
    var recordScore = 10;
    //var data = getData();


    //display beginning balance and record winnings and handlePlayButton
    $('.balance').text(balanceAmt);
    $('.currentWinnings').text(0);
    $('.recordScore').text(recordScore);
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
        console.log(pickedNumbers);
        //saveData(data);
    });

    //paint the picked numbers on the first row of white balls
    function paintPickedNums () {
        $('.numPicks .ball').text('');
        $.each(pickedNumbers, function(index, value) {
            $('.numPicks .pickedIndex'+index).text(value);
        });
    }
    // put into a function that can be called from many places
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

        // add spin class to balls for 3 seconds, then remove
        var spinBall$ = $(".numRandoms .ball");
        spinBall$.addClass('spin');
        setInterval(function(){
            spinBall$.removeClass("spin");

        }, 3000);

        // randomly calculate a number min and max inclusive
        function randomGenerator (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    //after a 3+ second delay, for each .numRandoms and .ball in the dom, run the Random# function and paint the result in the div and save it to the array.

        //painting numbers into balls for random selected numbers
        function paintRandomNums () {
            $('.numRandoms .ball').text('');
            $.each(randomNumbers, function(index, value) {
                $('.numRandoms .pickedIndex'+index).text(value);
            });
        }

        var pickRandom$ = $(".numRandoms .ball");
        randomNumbers = [];

        setTimeout(function(){

            pickRandom$.each(function (index, el) {
                var pickedRandomNumber = randomGenerator(1,10);
                randomNumbers.push(pickedRandomNumber);
            });
            paintRandomNums();

            var winnings = calculateWinnings();
            $('.currentWinnings').text(winnings);
            console.log(winnings);

            // calculate and display new balance

            if(winnings > 0) {
                balanceAmt = balanceAmt + winnings;
                $('.balance').text(balanceAmt);
            }

            if (balanceAmt > recordScore) {
                recordScore = balanceAmt;
                $('.recordScore').text(recordScore);
                //saveData(data);
            }

        }, 2500);

        // compare arrays of numbers (picked & random):  for each picked number, analyze if it is in the random array. For every one that is a yes, calculate and sum winnings.

        function calculateWinnings (){
            var countOfMatches = 0;
            for (var i = 0; i < pickedNumbers.length; i++) {
                if(randomNumbers.indexOf(pickedNumbers[i]) > -1) {
                    countOfMatches++;
                }
            }
            console.log(countOfMatches);

            //calculate winnings for ticket - if 0 wins, return 0 winnings
            //decided to give more
            if(countOfMatches == 0){
                return 0;
            } else {
                return Math.pow(2,countOfMatches);
            }
        }
    });
    // save Record Score to local storage and get Record Score if it is already in local storage
    /*function getData(){
        var existingRecordScore = localStorage.getItem('recordScore');

        if (existingRecordScore) {
            var data = JSON.parse(existingRecordScore);
            return data;
        } else {
            return data = balanceAmt;
        }
    }

    function saveData(data){
        if (window.localStorage){
            var dataString = JSON.stringify(data);
            console.log(dataString);
            localStorage.setItem('recordScore',dataString);
        } else {
            alert('Local Storage not Supported');
        }
    }*/

});




