var parser = N3.Parser();

$.get("vocabulary.ttl", function (data) {
    parser.parse(data, function (error, triple, prefixes) {
      console.log(triple);
    });
});