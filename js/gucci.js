$(document).ready(function () {

    $play = function (evt) {
        var $thisAudio = $(evt.target)
            .closest("div .face-container")
            .find("audio");
        $thisAudio[0].play();
    };

    $(".face-container").on("click", function (e) {
        console.log("connecting");
        $play(e);
    });

});