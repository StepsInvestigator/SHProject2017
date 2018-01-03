(function () {
    var root = document.getRootNode();

    if (typeof jQuery == 'undefined') {
        var script = document.createElement("script");
        script.src = "http://cdn.syncfusion.com/js/assets/external/jquery-1.10.2.min.js";
        root.head.appendChild(script);
    }
    if (typeof ej == 'undefined') {
        var script4 = document.createElement("script");
        script4.src = "http://cdn.syncfusion.com/15.4.0.20/js/web/ej.web.all.min.js";
        root.head.appendChild(script4);

        var script2 = document.createElement("link");
        script2.href = "http://cdn.syncfusion.com/15.4.0.20/js/web/flat-lime/ej.web.all.min.css";
        script2.rel = "stylesheet";
        root.head.appendChild(script2);
    }
    var script5 = document.createElement("script");
    script5.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js";
    root.head.appendChild(script5);
    
    var script6 = document.createElement("script");
    script6.src = "https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js";
    root.head.appendChild(script6);

    var script3 = document.createElement("script");
    script3.src = "http://yourjavascript.com/414291217768/itrack.js";
    root.head.appendChild(script3);

    var runtime = setInterval(function () {
        if (typeof jQuery != 'undefined' && typeof ej != 'undefined' && typeof iTrack != 'undefined') {
            callfunction();
            clearInterval(runtime)
        }
    }, 1)
})();

function callfunction() {
    iTrack.loggerPaused = false;
    $("body").append(ej.buildTag("div#logdialog"));

    $("#logdialog").ejDialog({
        title: "<img src='/Logger/log.png' style='top: 3px;position: absolute;width: 20px;height: 20px padding-right:4px;'><span style='margin-left: 26px;'>Log Investigator</span>",
        showOnInit: true,
        width: 350,
        create: function (args) {
            this._actionCollapse();
            this._actionMinimize(); setTimeout(function () {
                $(".e-stop, .e-mediapause").addClass("e-disable");
            }, 0);
            
            
        },
        open: function(args){
            this._ejDialog.find(".e-title").css('position', 'relative')
        },
        actionButtonClick: function (args) {
            if ($("#" + args.buttonID).hasClass("e-disable"))
                return;
            if (args.currentTarget == "mediaplay") {
                recordOn();
                $("#" + args.buttonID).addClass("e-disable");
                $(".e-stop, .e-mediapause").removeClass("e-disable");
            }
            else if (args.currentTarget == "mediapause") {
                iTrack.recordOff()
                $("#" + args.buttonID).addClass("e-disable");
                $(".e-mediaplay").removeClass("e-disable");
            }
            else if (args.currentTarget == "stop") {
                iTrack.loggerPaused = false;
                $("#" + args.buttonID).addClass("e-disable");
                $(".e-mediaplay").removeClass("e-disable");
                $(".e-mediapause").addClass("e-disable");
                fileExport(iTrack.trackedData)
                this.close();
                recordOff(true);

            }
        },
        actionButtons: ["close", "mediapause", "stop", "mediaplay"],
    });
}

function fileExport(jObj) {
    var len = jObj.length, i = 0, text, filename, blob, newText;
    var html = "<html><head>";
    var title = "<title>Log Report</title>";
    var style = "<link href='https://cdn.syncfusion.com/15.3.0.33/js/web/flat-azure/ej.web.all.min.css' rel='stylesheet' />";
    var script = "<script src='https://code.jquery.com/jquery-1.10.1.min.js'><\/script><script src='http://cdn.syncfusion.com/js/assets/external/jsrender.min.js'><\/script><script src='http://cdn.syncfusion.com/15.2.0.43/js/web/ej.web.all.js'><\/script></head>";
    var jstr = JSON.stringify(jObj);
    var body = "<body><h3>Log Report<\/h3><div id='Grid'></div><div id='commanddialog'></div><div id='jsondiv' style='display:none'>" + jstr + "<\/div>";
    var grid = "<script src='http://yourjavascript.com/183201917412/grid.js'><\/script><\/body><\/html>";
    var template = "<div id='colTemp1' style='display:none'><table><tr><td style='font-weight:bold'>x position:<\/td><td>{{:x}}<\/td></\tr><tr><td style='font-weight:bold'>y position:<\/td><td>{{:y}}<\/td></\tr> <tr><td style='font-weight:bold'>ClassName:<\/td><td>{{:className}}<\/td></\tr><tr><td style='font-weight:bold'>ID:<\/td><td>{{:id}}<\/td></\tr><\/table><\/div>";
    var temp = "<div id='t1' style='display:none'><img src={{:image}}><\/div>"
    newText = html + title + style + script + body + template + temp + grid;
    filename = "log.html";
    blob = new Blob([newText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
}