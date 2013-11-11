var Gucci = Backbone.Model.extend({

});

var GucciCollection = Backbone.Collection.extend({
    model: Gucci,
    parse: function (resp) {
        return resp.phrases;
    }
});

var GucciView = Backbone.View.extend({
    template: _.template($("#face-container-template").html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.addClass("face-container").
            attr("id", this.model.get("audioName"));
        return this;
    }

});

var GucciCollectionView = Backbone.View.extend({
    events: {
        "click .face-container": "playAudio"
    },
    render: function () {
        this.collection.forEach(this.renderPhrase, this);
        this.$el.addClass("all-face-container frame");
        return this;
    },
    renderPhrase: function (gucciPhrase) {
        var gucciView = new GucciView({model: gucciPhrase});
        this.$el.append(gucciView.render().el);
    },
    playAudio: function (evt) {
        var $thisAudio = $(evt.target)
            .closest("div .face-container")
            .find("audio");
        $thisAudio[0].play();
    }
});

var gucciCollection, gucciCollectionView;

$(document).ready(function () {

    gucciCollection = new GucciCollection();
    gucciCollection.url = "data/guwop-data.json";
    gucciCollection.fetch({
        success: function (model, response, options) {
            gucciCollectionView = new GucciCollectionView({collection: gucciCollection});
            $("body").prepend(gucciCollectionView.render().el);

        }
    });

});