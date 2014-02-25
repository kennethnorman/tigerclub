// tigerclub-diary.js

var nextevent = document.getElementById("tc-nextevent");
var allevents = document.getElementById("tc-allevents");
var pagemessage = document.getElementById("tc-pagemessage");
$("tc-nextevent").text("Working...");
$("tc-allevents").text("Working...");

// Get the song list from the file list.txt
var xmlhttp = sixistLibrary.GetXMLHTTPRequest();

var sourceFile = "https://www.google.com/calendar/feeds/5hstrrs3i19g9untj4h7tag7d0%40group.calendar.google.com/public/full?singleevents=true&futureevents=true&orderby=starttime&sortorder=ascending";
xmlhttp.open("GET", sourceFile, true);

// Process the song list into something we can output.
xmlhttp.onreadystatechange = function () {

    var xmlDiary;

    if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {

        pagemessage.innerText = "";
        $("tc-pagemessage").hide();

        xmlDiary = xmlhttp.responseXML;

        var xmlDoc = $.parseXML(xmlhttp.responseText),
            xml = $(xmlDoc),
            feed = xml.find("feed");

        $.each(feed.find("entry"), function (i, el) {
            var entry = $(el),
                title = entry.find("title").text(),
                when = entry.find("gd\\:when").attr("startTime");

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

    }
    else if (xmlhttp.readyState == 4) {
        pagemessage.innerText = "Unable to process calendar";
    }
    else {
        pagemessage.innerText = "Processing calendar";
    }
}
xmlhttp.send();



