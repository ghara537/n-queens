var Timer = function() {
  this.start = new Date().getTime();
};

Timer.prototype.click = function() {
  var now = new Date().getTime();
  return now - this.start;
};

var factorial = function(n) {
  result = 1;
  for (var i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
};