// tigerclub-diary.js

var nextevent = document.getElementById("tc-nextevent");
var allevents = document.getElementById("tc-allevents");
var pagemessage = document.getElementById("tc-pagemessage");
var foundevents = false;
$("tc-nextevent").text("Working...");
$("tc-allevents").text("Working...");

pagemessage.innerText = "Working...";

$(document).ready(UpdateCalendarEvents("https://www.google.com/calendar/feeds/5hstrrs3i19g9untj4h7tag7d0%40group.calendar.google.com/public/full?singleevents=true&futureevents=true&orderby=starttime&sortorder=ascending&alt=json"));


/**/
function UpdateCalendarEvents(sourceFile) {

    $.getJSON(sourceFile, function (data) {

        if (data.feed.entry.length != 0) {
            pagemessage.innerText = "";
            $("tc-pagemessage").hide();
        }

        $.each(data.feed.entry, function (i, el) {

            var entry = $(el),
                title = entry[0].title.$t,
                when = entry[0].gd$when[0].startTime;

            foundevents = true;

            if (nextevent) {
                if (i === 0) {
                    nextevent.appendChild(document.createTextNode(title));
                    nextevent.appendChild(document.createElement("br"));
                    nextevent.appendChild(document.createTextNode(when));
                    nextevent.appendChild(document.createElement("br"));
                }
            }

            if (allevents) {
                allevents.appendChild(document.createTextNode(title));
                allevents.appendChild(document.createElement("br"));
                allevents.appendChild(document.createTextNode(when));
                allevents.appendChild(document.createElement("br"));
                allevents.appendChild(document.createElement("br"));
            }
        });
    })
    .fail(function () {
        pagemessage.innerText = "No dates found.";

    });

}

