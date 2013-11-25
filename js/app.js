$(function () {

    Handlebars.registerHelper('ifIsValidImageURL', function(imageURL,  options) {
        return (imageURL.indexOf('/assets/no-image') != -1) ? options.inverse(this) : options.fn(this);
    });

    var templateEvents = Handlebars.compile($('#events_template').text());
    var templateEvent = Handlebars.compile($('#event_template').text());
    var templateProposals = Handlebars.compile($('#proposals_template').text());

    function displayEvents(data) {
        $('#content').empty().append(templateEvents({events: data}));
    };

    function displayEvent(data) {
        $('#content').empty().append(templateEvent(data));
    };

    function displayProposals(data) {
        $('#content').empty().append(templateProposals({event: data}));
    };

    var call4paperzDataManager = AeroGear.DataManager("events");
    var EventStore = call4paperzDataManager.stores["events"];

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
            EventStore.save(data);
            displayEvents(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    $(document).on("click", ".events-link", function (e) {
        e.preventDefault();
        displayEvents(EventStore.read());
    });

    $(document).on("click", ".event-link", function (e) {
        e.preventDefault();
        var recordID = parseInt($(this).attr('href').replace('#', ''));
        var selectedRecord = EventStore.read(recordID)[0];
        displayEvent(selectedRecord);
    });

    $(document).on("click", ".proposals-link", function (e) {
        e.preventDefault();
        var recordID = parseInt($(this).attr('href').replace('#', ''));
        var selectedRecord = EventStore.read(recordID)[0];
        displayProposals(selectedRecord);
    });

});