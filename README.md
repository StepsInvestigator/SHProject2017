# Overview

Now a day, customer reported issues can&#39;t be reproduce due to unable to get enough replication steps. Hence, we are giving some solution for our assumptions but most of the time, it won&#39;t be successfully resolved customer exact issues. Because of this problem, follow-ups count increases and customer gets frustrated. To overcome this problem, we are come up with a solution which is easy integration and auto replication step generator by our own JS library file.

**Log Investigator(LI)** is the process of tracking the user interaction and capturing screen shot of every action on a webpage and save it on local cache memory. This process can be control by Log Investigator control board with an option like Start, Pause, Resume, Stop. Once the completed their UI interaction, he/she click the stop record. Finally, recorded user interactions are exported as html file with tabulated step by step details about user interactions with proper screenshot and action performed on the element details.

# Requirement

 Since LI has developed in JavaScript language. Hence, it will support all JavaScript supported browsers. Make sure that browser enabled JavaScript contents option.



# Design and Implementation

##      Design

 Log Investigator(LI) control board is used to control the record the user action. This control board has been designed as user-friendly interaction with user to manage record their steps. The following screen shot shows the UI design of control board and its controls.



##      Implementation

 LI library file has been implemented with JavaScript program and it is available as CDN link. Hence, user can directly refer to his/her samples as reference script tag.


 Control board will display on the page once after referred LI library file. In the control board have some controls like start, pause, resume, stop. User can also close this board using close button.

| Controls | Actions |
| --- | --- |
| Start | This action will invoke the tracking process of UI interactions |
| Pause | This action pauses the record |
| Resume | This action resumes the record it will continue with existing recorded steps |
| Stop | This action stops the recording and export the report with step by step replication steps. |

###         Custom Scope Support

LI also supports custom scope recording option. By using this option, user can set the specific region to the UI interactions. And, he/she can override by our public methods. The following code snippet shows how to change the default scope and instance.

# How to run the application

##   Steps:

1. Refer loginvest.js script library file to recording page.
2. Launch/Refresh the webpage.
3. Click Play button on LI control board.
4. Perform UI interactions like Click, Double-click, Right-click.
5. Click Stop button on LI control board
6. HTML file will be exported with step by step replication steps with screen shots.
       

# Third party plugins and library usages

| Plugin/Library | Usage |
| --- | --- |
| **Syncfusion** web controls –  ej.web.all.min.js | We have designed Control board using **ejDialog** and exported reports using **ejGrid** |
| **JQuery,** | Syncfusion web control requires Jquery library file. |
| **FileSaver.js** | It is used to write JSON data to HTML file and exported |
| **Canvas library** | It is used to Convert HTML element to Canvas and save as image element |

# Future Scope

 Our future proposal plans,

1. Develop plugin to recording UI actions like chrome plugins
2. This plugin connects with remote server. Hence, it can be easily tracked by server side.
3. Auto Solution reported, most common problems are automatically replied by the server.

# Reference

Its already existing in the Window 7, 8.1, 10. Our project concentrating this concept for the Website.

[https://support.microsoft.com/en-in/help/22878/windows-10-record-steps](https://support.microsoft.com/en-in/help/22878/windows-10-record-steps)
