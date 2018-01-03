
// Hackathon - 2018 iTrack.js

(function () {
    window.iTrack = this;
    iTrack.jsonObject = {};
    iTrack.trackedData = [];
    var position = window.scrollY,
        scope = window, instance = "default";

    iTrack.onload = function () {       
        getBrowserInfo();
        getSystemInfo();
        getJqueryInfo();
    }
    
    var events = ["click", "mousedown", "dblclick", "contextmenu", "scroll"];

    getSystemInfo = function () {
        var sysObj = {}, OSName = "Unknow OS";

        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
        if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

        sysObj.OSName = OSName;
        sysObj.language = navigator.language;

        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;

        sysObj.screenWidth = x;
        sysObj.screenHeight = y;

        window.jsonObject.systemInfo = sysObj;
    }

    getBrowserInfo = function () {
        var obj = {},
            agent = navigator.userAgent,
            browserName, browserVersion, majorVersion,
            tempName, tempVersion, xver;

        // In Opera, the true version is after "Opera" or after "Version"
        if ((tempVersion = agent.indexOf("Opera")) != -1) {
            browserName = "Opera";
            browserVersion = agent.substring(tempVersion + 6);
            if ((tempVersion = agent.indexOf("Version")) != -1)
                browserVersion = agent.substring(tempVersion + 8);
        }
            // In MSIE, the true version is after "MSIE" in userAgent
        else if ((tempVersion = agent.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
            browserVersion = agent.substring(tempVersion + 5);
        }
            // In Chrome, the true version is after "Chrome" 
        else if ((tempVersion = agent.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
            browserVersion = agent.substring(tempVersion + 7);
        }
            // In Safari, the true version is after "Safari" or after "Version" 
        else if ((tempVersion = agent.indexOf("Safari")) != -1) {
            browserName = "Safari";
            browserVersion = agent.substring(tempVersion + 7);
            if ((tempVersion = agent.indexOf("Version")) != -1)
                browserVersion = agent.substring(tempVersion + 8);
        }
            // In Firefox, the true version is after "Firefox" 
        else if ((tempVersion = agent.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
            browserVersion = agent.substring(tempVersion + 8);
        }
            // In most other browsers, "name/version" is at the end of userAgent 
        else if ((tempName = agent.lastIndexOf(' ') + 1) <
                  (tempVersion = agent.lastIndexOf('/'))) {
            browserName = agent.substring(tempName, tempVersion);
            browserVersion = agent.substring(tempVersion + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the browserVersion string at semicolon/space if present
        if ((xver = browserVersion.indexOf(";")) != -1)
            browserVersion = browserVersion.substring(0, xver);
        if ((xver = browserVersion.indexOf(" ")) != -1)
            browserVersion = browserVersion.substring(0, xver);

        majorVersion = parseInt('' + browserVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion  = ''+parseFloat(navigator.appVersion); 
            majorVersion = parseInt(navigator.appVersion,10);
        }

        obj.browserName = browserName;
        obj.fullVersion = browserVersion;
        obj.majorVersion = majorVersion;
        obj.appName = navigator.appName;
        obj.userAgent = navigator.userAgent;

        window.jsonObject.browserInfo = obj;
    }
    getJqueryInfo = function () {
        var obj = {};
        if (typeof jQuery != 'undefined') {              
            window.jsonObject.jquery = jQuery.fn.jquery;
        }       
    }
    
    eventMethod = function (args) {
        var evtObj = {};
        var ele = args.target.closest('.e-widget');
        var tar = ele != null ? args.target.closest('.e-widget').id: ele;
        if (tar.indexOf("logdialog") == -1) {
            evtObj.type = args.type;
            evtObj.tagName = args.target.tagName;
            evtObj.element = args.target;
            evtObj.x = args.pageX;
            evtObj.y = args.pageY;
            evtObj.className = args.target.className;
            evtObj.id = args.target.id;
            evtObj.time = getDateTime();
            evtObj.message = getMessage(evtObj);
            evtObj.instance = getInstance(args.target);
            evtObj.image = getImage(evtObj);
            window.trackedData.push(evtObj);
        }
    }
    

    recordOn = function () {
        addEvents(scope, events, eventMethod);
        console.log("iTrack started");
    }
    recordOff = function (isRecordStop) {
        removeEvents(scope, events, eventMethod);
        console.log("iTrack stopped");
        if (isRecordStop) {
            iTrack.jsonObject = {};
            iTrack.trackedData = [];
        }
    }

    function addEvents(el, evt, fn) {

        for (var i = 0, l = evt.length; i < l; i++) {
            el.addEventListener(evt[i], fn);
        }
    }

    function removeEvents(el, evt, fn) {

        for (var i = 0, l = evt.length; i < l; i++) {
            el.removeEventListener(evt[i], fn);
        }
    }

    function getDateTime() {
        var currentdate = new Date();

        var datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth() + 1) + "/"
                        + currentdate.getFullYear() + " "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds();
        return datetime;
    }

    function getMessage(evt) {
        var msg = "Unknown",
            type = evt.type,
            target = "";

        target = (evt.id != "") ? "#" + evt.id : (evt.className != "") ? "." + evt.className : (evt.tagName != "") ? "<" + evt.tagName + ">" : "";

        if (type == "click") msg = "User Left clicked on " + target;

        else if (type == "dblclick") msg = "User Double-clicked on " + target;

        else if (type == "contextmenu") msg = "User Right clicked on " + target;

        else if (type == "mousedown") msg = "User Mouse down on " + target;

        else if (type == "scroll") {
            var scroll = $(window).scrollTop();

            if (scroll > position)
                msg = "User Scroll-Down on " + evt.element;
            else
                msg = "User Scroll-Up " + evt.element;
        }
        return msg;
    }
    function getInstance(element) {
        var instance = {
            controlObject: "",
            controlName: ""
        };

        if (element == "undefined" || element == "" || element == null) return instance;

        var rootParent;
        if (typeof jQuery != 'undefined' && (rootParent = findCloset(element, "e-js")) != null) {
            instance.controlObject = $(element).closest(".e-js").data();
            instance.controlName = instance.controlObject["ejWidgets"].toString();
            instance.controlName = (instance.controlName != "") ? "Register controls" + instance.controlName : instance.controlName;
        }
        else if ((rootParent = findCloset(element, "e-control")) != null) {
            instance.controlObject = document.querySelector(".e-control").ej2_instances;
            instance.controlName = instance.controlObject[0].getModuleName();
            instance.controlName = (instance.controlName != "") ? "Register controls" + instance.controlName : instance.controlName;
        }
        return instance;

    }

    function getImage(evt) {
	
        html2canvas(document.getElementsByTagName("body"), {
            onrendered: function (canvas) {
                var ctx = canvas.getContext('2d');
                evt.image = canvas.toDataURL();
            }
        });

    }

    iTrack.onerror = function (errorMsg, url, lineNumber) {
        var args = {
            time: getDateTime(),
            message: 'Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
        }
        window.trackedData.push(args);
    }

    iTrack.scopeSetter = function (element) {
        scope = element;
    }

    iTrack.instanceSetter = function (obj) {
        instance = obj;
    }

    function findCloset (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    _exportData = function () {
        return JSON.stringify(window.jsonObject);
    }
}());



