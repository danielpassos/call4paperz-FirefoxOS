$(function () {

    var template = Handlebars.compile($('#events_template').text());

    function displayEvents(data) {
        $('#events').empty().append(template({events: data}));
    };

    var call4paperzPipeline = AeroGear.Pipeline([
        {
            name: "events",
            settings: {
                baseURL: "http://call4paperz.com/",
                endpoint: "events.jsonp"
            }
        }
    ]);

    call4paperzPipeline.pipes[ "events" ].read({
        jsonp: true,
        success: function (data) {
            displayEvents(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

});