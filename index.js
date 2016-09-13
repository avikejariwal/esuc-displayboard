var express = require('express');
var app = express();
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://esuc-ucla-eventflyer.firebaseio.com/");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var dateCheck = function (eventDate) {
  //console.log(eventDate.toString());
  eDate = dateString(eventDate, 0);
  var today = new Date();
  var timeDiff = eDate.getTime() - today.getTime();
  var daysDiff = Math.ceil(timeDiff/(1000*3600*24));
  if (daysDiff>14 || daysDiff<0)
    return false;
  return true;
};

var dateString = function (date, time) {
  var date = date.split('-');
  var eventYear = date[0];
  var eventMonth = date[1];
  var eventDate = date[2];
  var eDate = [eventYear, eventMonth-1, eventDate];
  var hrs = time / (60*60*1000);
  var min = (time - hrs * 60 * 60 * 1000)/(60 * 1000);
  var eventDate = new Date(eDate[0], eDate[1], eDate[2], hrs, min, 0, 0);
  return eventDate;
}

app.get('/', function(request, response) {
  var imageURLS = [];
  var moderated_events = [];
  var count = 0;

  myFirebaseRef.child('events').on("value", function(allEvents) {
  	allEvents.forEach(function(events){
      var date = events.child('eventDate').val().toString();
      //console.log(date);
      //console.log("Date valid: " +dateCheck(date));
      //console.log("Moderated: " + events.child('moderated').val());
  		if (events.child('moderated').val() == true && dateCheck(date) == true) {
        var temp_event = events.val();
        temp_event.dateAndTime = dateString(temp_event.eventDate, temp_event.eventTimeMs);
        //console.log(temp_event.eventName);
  			moderated_events.push(temp_event);
        if (events.child('flierAdded').val() == true) {
          imageURLS.push(events.child('cloudinaryURL').val());
        }
  		}
  	});
    response.render('pages/db', {events: moderated_events, fliers:imageURLS});
  });
  
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


