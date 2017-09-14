function generate_limerick(){
  return $.getJSON("/explorations/limerick_lines.json")
      .then(function(json) {
        var line_types = json;

        var long_lines = get_lines(line_types['long'], 3);
        var short_lines = get_lines(line_types['short'], 2);
        var limerick = [
            long_lines[0],
            long_lines[1],
            short_lines[0],
            short_lines[1],
            long_lines[2]]
        return limerick;
      });
}

function get_lines(emphasis_patterns, count){
  var last_syllables = dict_random_choice(emphasis_patterns);
  var last_tokens = dict_random_choice(last_syllables);
  var line_sets = dict_random_sample(last_tokens, count);
  var lines = [];
  for(k in line_sets){
    var index = Math.floor(Math.random() * (line_sets[k].length));
    var line = format_line(line_sets[k][index]);
    lines.push(line);
  }
  return lines;
}


function format_line(line) {
  return line.toUpperCase()
}

function dict_random_choice(population) {
    var keys = Object.keys(population)
    var max = keys.length;
    // creating random choice key
    var index = Math.floor(Math.random() * max);
    var key = keys[index];
    return population[key];
}

function dict_random_sample(population, size){
    var arr = Object.keys(population);
    var shuffled = arr.slice(0),
        i = arr.length,
        temp,
        index;

    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    var keys = shuffled.slice(0, size);
    var lines = [];
    for (idx in keys) {
      var key = keys[idx];
      lines.push(population[key])
    }
    return lines;
}


function generate() {
    $(".limerick-body").empty();
    generate_limerick().then(function(limerick){
      for(l in limerick) {
        $(".limerick-body").append(limerick[l] + "<br\>");
      }
    })
  }

// run on ready
$(function() { generate(); });