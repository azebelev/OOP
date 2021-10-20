'use strict'
// Constructor for object 
/**
 * @abstract
 * @constructor
 * @param {*} ID ID of product
 * @param {*} name product name
 * @param {*} description product description
 * @param {*} price price of one item of product
 * @param {*} quantity quantity of product
 * @param {*} reviews reviews of product
 * @param {*} images array of images of product
 * @param {*} brand brand of product
 * @param {*} date date of appearing of the product on warehouse
 */
let AbstractProduct = function (ID, name, description, price, quantity, reviews, images, brand, date) {
  if (new.target == AbstractProduct) {
    throw new Error("Can't instantiate abstract class!");
  }
  this.ID = ID;
  this.name = name;
  this.description = description;
  this.price = price;
  this.brand = brand;
  this.quantity = quantity;
  this.date = new Date(date);
  this.images = images || [];
  this.reviews = reviews || [];
}
//Getters and setters for each property
Object.assign(AbstractProduct.prototype, {

  setID(ID) {
    this.ID = ID;
    return this;
  },
  getID() {
    return this.ID;
  },
  setName(name) {
    this.name = name;
    return this;
  },
  getName() {
    return this.name;
  },
  setDescription(description) {
    this.description = description;
    return this;
  },
  getDescription() {
    return this.description;
  },
  setQuantity(quantity) {
    this.quantity = quantity;
    return this;
  },
  getQuantity() {
    return this.quantity;
  },
  setBrand(brand) {
    this.brand = brand;
    return this;
  },
  getBrand() {
    return this.brand;
  },
  setReviews(reviews) {
    this.reviews = reviews;
    return this;
  },
  getReviews() {
    return this.reviews;
  },
  setDate(date) {
    this.date = date;
    return this;
  },
  getDate() {
    return this.date;
  },

  // function returns review by ID
  getReviewByID(ID) {
    for (let review of this.reviews) {
      if (review.ID == ID) return review;
    }
  },
  // function adds new review to array of reviews
  addReview(ID, author, date, comment, rating) {
    this.reviews.push(this.review(ID, author, date, comment, rating))
    return this;
  },
  // function deletes review by ID 
  deleteReview(ID) {
    this.reviews = this.reviews.filter(review => review.ID !== ID);
  },
  // function calculate and returns average rating
  getAverageRating() {
    let propertyCounter = 0;
    let ratingSum = 0;
    this.reviews.forEach(review => {
      for (let property in review.rating) {
        if (review.rating[property] !== undefined) {
          propertyCounter++;
          ratingSum += +review.rating[property];
        }
      }
    });
    return ratingSum / propertyCounter;
  },
  // function returns image by number
  getImage(numberOfImage) {
    if (numberOfImage == undefined) {
      return this.images[0];
    } else return this.images[numberOfImage];
  }
})

//new property(function) : shows all property name and value  
AbstractProduct.prototype.getFullInformation = function () {
  for (let element in this) {
    if (this.hasOwnProperty(element)) {
      console.log(element + " : " + this[element] + "\n");
    }
  };
}
//new property (function) : returns average price of specified product
AbstractProduct.prototype.getPriceForQuantity = function (quantity) {
  return ("$" + this.price * quantity);
}
//function constructor for review 
AbstractProduct.prototype.review = function (ID, author, comment, date, rating) {
  return {
    ID, author, comment,
    date: new Date(date),
    //object rating with it's properties
    rating: {
      service: rating.service,
      price: rating.price,
      value: rating.value,
      quality: rating.quality
    }
  };
}
// getter and setter function
AbstractProduct.prototype.getter_setter = function (flag, propertyName, value) {
  if (flag.toLowerCase() == "set") {
    for (let property in this) {
      if (property == propertyName) {
        this[property] = value;
        return this;
      }
    }
  }
  if (flag.toLowerCase() == "get") return this[propertyName];

  console.log("invalid input");
}

/*
function constructor for object Clothes 
*/
function Clothes(material, color, ID, name, description, price, quantity, images, brand, date, reviews) {
  AbstractProduct.call(this, ID, name, description, price, quantity, reviews, images, brand, date);

  this.material = material;
  this.color = color;
}

//inheritance from AbstractProduct
Clothes.prototype = Object.create(AbstractProduct.prototype);
//Clothes.prototype.constructor = Clothes;

//adding of new properties to prototype of Clothes
Object.assign(Clothes.prototype, {
  setMaterial(material) {
    this.material = material;
    return this;
  },
  getMaterial() {
    return this.material;
  },
  setColor(color) {
    this.color = color;
    return this;
  },
  getColor() {
    return this.color;
  }
})

/*
function constructor for object Electronics
*/
function Electronics(warranty, power, ID, name, description, price, quantity, images, brand, date, reviews) {
  AbstractProduct.call(this, ID, name, description, price, quantity, reviews, images, brand, date);
  this.warranty = warranty;
  this.power = power;
}
Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;
//adding of new properties to prototype of Electronics
Object.assign(Electronics.prototype, {
  setWarranty(warranty) {
    this.warranty = warranty;
    return this;
  },
  getWarranty() {
    return this.warranty;
  },
  setPower(power) {
    this.power = power;
    return this;
  },
  getPower() {
    return this.power;
  }
})

/*
function for finding products by specified accordance
*/
function search(products, searchString) {
  let searchResult = [];
  products.forEach(prod => {
    if (prod instanceof AbstractProduct) {
      if (prod.name.startsWith(searchString) || prod.description.includes(searchString)) searchResult.push(prod);
    }
  });
  return searchResult;
}

/*
function sort products in accordance with sortRule
*/
function sortProducts(products, sortRule) {
  let sortedProducts;

  switch (sortRule) {
    case ("ID"): sortedProducts = products.sort((a, b) => a.ID - b.ID);
      break;
    case ("name"): sortedProducts = products.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
      break;
    case ("price"): sortedProducts = products.sort((a, b) => a.price - b.price);
      break;
    default: console.log("invalid rule for sort");
  }
  return sortedProducts;
}


//new AbstractProduct("1");
let t_shot = new Clothes("silk", "red", "1", "t_shot", "for sport", "5", "10", ["t1.png", "t2.png"]);
let tv = new Electronics("2 year", "220W", "2", "TV", "55 inch", "500", "3", ["tv1.png", "tv2.png"]);
console.log("Average rating: " + t_shot.addReview("1", "Andrew", "1999 2", "cool",
  { service: "5", quality: "4", price: "100", value: "10" })
  .addReview("2", "Fred", "2005 2", "cool",
    { service: "1", quality: "4", price: "1", value: "10" })
  .getAverageRating());
t_shot.getFullInformation();
t_shot.deleteReview("1");
console.log("deleted review :" + t_shot.getReviewByID("1")?.author)
console.log(t_shot.getPriceForQuantity(100));
console.log(t_shot.setColor("wight").getColor() + "  " + t_shot.getImage("1"));
console.log(search([t_shot, tv], "55")[0].name);
console.log(sortProducts([t_shot, tv], "price"));
console.log(t_shot.getter_setter("set", "name", "vasia").name)
console.log(tv.getter_setter("get", "name"));
