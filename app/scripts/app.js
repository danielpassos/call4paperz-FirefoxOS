$(function () {

    Handlebars.registerHelper('ifIsValidImageURL', function(imageURL,  options) {
        return (imageURL.indexOf('/assets/no-image') != -1) ? options.inverse(this) : options.fn(this);
    });

    Handlebars.registerHelper('ifPositive', function(number,  options) {
        return (number >= 0) ? options.fn(this) : options.inverse(this);
    });

    function displayEvents(data) {
        $('#content').empty().append(Call4Paperz.Templates['event/list']({events: data}));
    };

    function displayEvent(data) {
        $('#content').empty().append(Call4Paperz.Templates['event/detail'](data));
    };

    function displayProposals(data) {
        $('#content').empty().append(Call4Paperz.Templates['proposal/detail']({event: data}));
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

    $(document).on("click", ".proposal-description", function (e) {
        e.preventDefault();
        alert($(this).data('description'));
    });

});