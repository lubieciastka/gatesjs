describe('Gates.js unit tests', function() {

  const gates = gatesJs;

  const responseCode = {
      content: {
          foo: true
      },
      statusCode: 200
  };

  let value;

  it('Check success response and true expression', function() {

    gates.set(responseCode.statusCode)
         .gate([200, responseCode.content.foo === true], function() {
            value = true;
          })
          .default(function (){
            value = false;
          });

    expect(value).toEqual(true);

  });

  it('Launch whatever response and whatever expression', function() {

    gates.set(responseCode.statusCode)
         .gate([200, responseCode.content.foo === false], function() {
            value = false;
          })
          .gate(["*", "*"], function() {
             value = true;
           })
          .default(function (){
            value = false;
          });

    expect(value).toEqual(true);

  });

  it('Launch whatever response and true expression', function() {

    gates.set(responseCode.statusCode)
         .gate(["*", responseCode.content.foo === false], function() {
            value = false;
          })
          .default(function (){
            value = false;
          });

    expect(value).toEqual(true);

  });

  it('Check susccess response and whatever expression', function() {

    gates.set(responseCode.statusCode)
         .gate([200, "*"], function() {
            value = true;
          })
          .default(function (){
            value = false;
          });

    expect(value).toEqual(true);

  });

});
