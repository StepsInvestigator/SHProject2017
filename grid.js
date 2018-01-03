$(function(){
    var obj = JSON.parse($("#jsondiv").text());
    var step = 0;
    $("#Grid").ejGrid({
        allowPaging: true,
        dataSource: obj,
        gridLines: "horizontal",
        allowTextWrap: true,
        textWrapSettings: { wrapMode: "content" },
        templateRefresh: function(args){
            if(args.column.headerText == "Steps"){
                step = step+1;
                $(args.cell).find("span").text(step);
            }
            if (args.column.headerText == "Screenshot") {
                $(args.cell).find('a').bind('click', function () {
                    var grid = $("#Grid").ejGrid("instance");
                    var index = grid.getIndexByRow(this.closest("tr"));
                    var record = grid.getCurrentViewData()[index];
                    $("#commanddialog").html($("#t1").render(record)).ejDialog("open");
                });
            }
        },
        columns: [
            {headerText: "Steps", width: "40", template: "<span></span>", textAlign:'center'},
            {field: "time", width: "80", headerText:"TimeStamp", format: "{0:hh:mm:ss}"},
            {field: "type", width:"40", headerText: "Type"},
            {field: "tagName", width:"40", headerText: "TagName"},
            {headerText: "Details", width:"100", template: "#colTemp1"},
            {field: "message", headerText: "Message", width:"100"},
            {headerText: "Screenshot", width:"30", template: "<a href='#'>View Image</a>"}
            ]
    })
    $("#commanddialog").ejDialog({
        "width": 700,
        title: "Details",
        showOnInit: false,
        enableResize: false,
        target: "#Grid"
    });
})()