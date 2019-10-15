var http = require("http");

//create a server object:
http
  .createServer(function(req, res) {
    res.write(tovars); //write a response to the client
    res.end(); //end the response
  })
  .listen(3000); //the server object listens on port 8080ddd

class Tovar {
  constructor(weight, cost) {
    this.weight = weight;
    this.cost = cost;
    this.ratio = cost / weight;
  }
}

const machine = new Tovar(3, 3);

class Rucksack {
  constructor(maxweight) {
    this.maxweight = maxweight;
    this.tovars = [];
    this.weight = 0;
  }

  set(tovar) {
    if (Array.isArray(tovar)) {
      tovar.forEach((element, index) => {
        if (this.weight === this.maxweight) {
        } else if (this.weight + element.weight > this.maxweight) {
          element.weight = this.maxweight - this.weight; //3
          element.cost = element.weight * element.ratio; //30
          this.tovars.push(element);
          this.weight = this.weight + element.weight;
        } else {
          this.weight = this.weight + element.weight;
          this.tovars.push(element);
        }
      });
    }
  }
  sort(tovars) {
    return tovars.sort(function(a, b) {
      if (a.ratio > b.ratio) {
        return -1;
      }
      if (a.ratio < b.ratio) {
        return 1;
      }
      // a должно быть равным b
      return 0;
    });
  }
  log() {
    this.tovars.forEach(element => {
      console.log(element);
    });
  }
  cost() {
    let totalcost = 0;
    this.tovars.forEach(element => {
      totalcost = totalcost + element.cost;
    });
    return totalcost;
  }
}
const ruck = new Rucksack(6);
const tovars = [
  new Tovar(1, 15),
  new Tovar(2, 20),
  new Tovar(4, 40),
  new Tovar(5, 50),
  new Tovar(3, 25)
];
ruck.set(ruck.sort(tovars));
ruck.log();
console.log(ruck);
console.log(` total cost is ${ruck.cost()}`);
