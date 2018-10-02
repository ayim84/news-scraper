$.getJSON("/articles", function(data)
{
    console.log("Data: ", data);
    for(var i = 0; i < data.length; i++)
    {
        var cardDiv = $("<div class='card'>");
        var cardTitle = $("<h5 class='card-header text-center'>");//.text(data[i].headline);
        var articleUrl = $("<a>").text(data[i].headline);
        articleUrl.attr({href: data[i].url, target: "_blank", class: "text-dark"});
        cardTitle.append(articleUrl);
        var cardBody = $("<div class='card-body'>").text(data[i].summary);
        var cardButton = $("<button type='button' id='addNote' class='btn btn-info' data-toggle='modal' data-target='#noteModal'>").text('Add/View Note(s)');
        cardButton.attr("data-id", data[i]._id);
        var hr = $("<hr>");

        cardDiv.append(cardTitle);
        cardDiv.append(cardBody);
        cardDiv.append(cardButton);

        $("#articles").append(cardDiv);
        $("#articles").append(hr);
    }
});

$(document).on("click", "#addNote", function()
{
    $("#noteBody").empty();

    var thisId = $(this).attr("data-id");

    $.get("/articles/" + thisId, function(data)
    {
        console.log(data);
        $("#modalTitle").empty();
        $("#modalTitle").append(data.headline);
        $("#noteBody").append("<p id='textboxTitle'>")
        $("#textboxTitle").text("Add Note:");
        $("#noteBody").append("<textarea class='form-control' id='noteText' rows='3'></textarea>");
        $(".modal-footer").html("<button type='button' id='saveNote' class='btn btn-primary' data-id = '" + data._id + "' data-dismiss='modal'>Save</button>");

        if(data.note)
        {
            console.log("poop");
            $("#noteBody").append("<hr>");
            $("#noteBody").append("<p id='modalBodyText'>");
            $("#modalBodyText").text("Previous Note:");
            $("#noteBody").append(data.note.body);
        }
    })
});

$(document).on("click", "#saveNote", function()
{
    var thisId = $(this).attr("data-id");
    var noteText = $("#noteText").val().trim();
    console.log(noteText);

    if(noteText)
    {
        $.post("/articles/" + thisId, {body: $("#noteText").val().trim()})
        .then(function(data)
        {
            console.log(data);
            // $("#noteBody").empty();
        });
    }

});