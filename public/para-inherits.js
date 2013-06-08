var createPerson = function(firstName, lastName){
  var person = {
    firstName: firstName,
    lastName: lastName,
    sayHello: function() {
      return 'Hi there.';
    }
  };

  Object.defineProperties(person,{
    fullName: {
      get: function() {
        return this.firstName + ' ' + this.lastName;
      },
      enumerable: true,
      configurable: true
    }});

    return person;
};

var createEmployee = function(firstName, lastName, position){
  var person = createPerson(firstName, lastName);
  person.position = position;

  var fullName = Object.getOwnPropertyDescriptor(person, 'fullName');
  var fullNameFunc = fullName.get.bind(person);

  var sayHelloFunc = Object.getOwnPropertyDescriptor(person, 'sayHello').value.bind(person);

  Object.defineProperties(person,{
    fullName: {
      get: function() {
        return fullNameFunc() + ', ' + this.position;
      },
      enumerable: true,
      configurable: true
    },
    sayHello: {
      get: function() {
        return sayHelloFunc() + ', My name is ' + this.fullName;
      }
    }
  });

  return person;
};

var johnDoe = createEmployee('John', 'Deo', 'Manager');
johnDoe.fullName;
johnDoe.sayHello;
