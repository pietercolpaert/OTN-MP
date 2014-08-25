var parser = N3.Parser();
var store = N3.Store();
var N3Util = N3.Util;
$.get("vocabulary.ttl", function (data) {
    parser.parse(data, function (error, triple, prefixes) {
      if (triple) {
        store.addTriple(triple);
      } else {
        //done
        addThemes();
      }
      //console.log(triple);
    });
});

var addThemes = function () {
  var themes = store.find(null, "http://www.w3.org/2004/02/skos/core#inScheme", "http://semweb.mmlab.be/ns/otn-mp#ThemeTaxonomy");
  $.each(themes, function(index, triple){
    var theme = store.find(triple.subject,null, null);
    var title = N3Util.getLiteralValue(store.find(triple.subject,"http://www.w3.org/2000/01/rdf-schema#label",null)[0].object);
    var comment = N3Util.getLiteralValue(store.find(triple.subject,"http://www.w3.org/2000/01/rdf-schema#comment",null)[0].object);
    $("#vocabulary-classes").append("<section id='otn" +title + "'><h3><a href='" + triple.subject + "' target='_blank'>" + title + "</a></h3>");
    $("#vocabulary-classes").append("<p>" + comment + "</p>");
    $("#vocabulary-classes").append("</section>");
  });
}

