var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

// some html storage functions
function saveList() {
  sessionStorage.setItem('lap',$("#laplist_container").html());
}

function clearList(flag, content) {
	sessionStorage.clear();
}

function retrieveList() {
	$("#laplist_container").append("<ol id='laplist'></ol>");
	if (window.sessionStorage) {
		if (sessionStorage.getItem('lap') != "")
			{
				$("#laplist_container").append("<hr />");
    			$("#laplist_container").append(sessionStorage.getItem('lap'));
			}
	} else {
  		console.log('No session storage support');
	}
}

// timer functions
function getNow(){
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    return (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
}

function add(){
    $("#stopwatch").html(getNow());
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

$(document).ready(function(){
	retrieveList();
    $("#lap").prop('disabled', true);
    $("#stop").prop('disabled', true);

    /* Start button */
    $("#start").on('click', function(){
        $("#lap").prop('disabled', false);
        console.log("Timer start");
        timer();
        $("#start").prop('disabled', true);
        $("#stop").prop('disabled', false);
    });

    // Stop button 
    $("#stop").on('click', function() {
        clearTimeout(t);
        $("#lap").prop('disabled', true);
        $("#start").prop('disabled', false);
        $("#stop").prop('disabled', true);
    });

    // Clear button 
    $("#reset").on('click', function() {
        $("#stopwatch").html("00:00:00");
        seconds = 0;
        minutes = 0;
        hours = 0;
    });


    // lap functions
    $("#lap").on('click', function(){
		$('#laplist_container ol:first-child').append("<li>"+getNow()+"</li>");
        //$("#laplist").append("<li>"+getNow()+"</li>");
		saveList();
    });

    $("#clearlap").on('click', function(){
        $('#laplist_container ol:first-child').empty();
    });
	
	$("#clearlap").on('click', function(){
        $('#laplist_container').empty();
		clearList();
    });
	
});


