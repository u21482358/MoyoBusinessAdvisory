afterEach(() => {

  cy.wait(2000)
  cy.get('button[data-testid=signup-button]').click();
    console.log("hit")
 cy.intercept('Post', 'https://localhost:7267/api/User/*',(req)=>{
     req.continue((res) => {
   // res.body.data.listBankAccount = []
  })

}).as('GetIntercept');

//cy.wait(10000)
cy.wait('@GetIntercept').then((interception)=>{
 console.log(interception)
//alert("hi")
expect(interception.response.statusCode).to.be.within(200, 299); 
})


// })
});

//const { input } = require("@angular/core");

describe('Sign Up Vendor', () => {
  it('Visits the Angular app', () => {
    cy.visit('localhost:4200');
     cy.get('[data-testid=signup]').click();
cy.get('mat-dialog-container').should("be.visible")

 cy.wait(1000)
cy.get('mat-dialog-container').find('input[data-testid=signup-name]').type('TuksInc'); // find you specify the input?
//https://stackoverflow.com/questions/56520834/selecting-options-from-mat-select-using-cypress
cy.get('mat-select[data-testid=signup-user]').click().get('mat-option[data-testid=signup-user]').contains('vendor').click();
cy.get('mat-dialog-container').find('input[data-testid=signup-email]').type('u21482358@tuks.co.za');
cy.get('mat-dialog-container').find('input[data-testid=signup-password]').type('123456');
//cy.get('button[data-testid=signup-button]').click()
    })

  
    });

    describe('Sign Up 2nd Vendor', () => {
  it('Visits the Angular app', () => {
    cy.visit('localhost:4200');
     cy.get('[data-testid=signup]').click();
cy.get('mat-dialog-container').should("be.visible")

 cy.wait(1000)
cy.get('mat-dialog-container').find('input[data-testid=signup-name]').type('yahooInc'); // find you specify the input?
//https://stackoverflow.com/questions/56520834/selecting-options-from-mat-select-using-cypress
cy.get('mat-select[data-testid=signup-user]').click().get('mat-option').contains('vendor').click();
cy.get('mat-dialog-container').find('input[data-testid=signup-email]').type('u21482358@yahoo.co.za');
cy.get('mat-dialog-container').find('input[data-testid=signup-password]').type('123456');
//cy.get('button[data-testid=signup-button]').click()
    })

  
    });

    
describe('Sign up Client', () => {
  it('Visits the Angular app', () => {
    cy.visit('localhost:4200');
    cy.get('[data-testid=signup]').click();
   // cy.visit('https://material.angular.io/components/dialog/overview')
//  cy.on('window:alert', cy.get(['data-testid=signup-email']).type("ma.gaitsmith@gmail.com")) 
//cy.get('app-adduser').find(['mat-dialog-content']).click()
cy.get('mat-dialog-container').should("be.visible")
 cy.wait(1000)
cy.get('mat-dialog-container').find('input[data-testid=signup-name]').type('Sylvia'); // find you specify the input?
//https://stackoverflow.com/questions/56520834/selecting-options-from-mat-select-using-cypress
cy.get('mat-select[data-testid=signup-user]').click().get('mat-option').contains('client').click();
cy.get('mat-dialog-container').find('input[data-testid=signup-email]').type('gaitsmith@hotmail.com');
cy.get('mat-dialog-container').find('input[data-testid=signup-password]').type('123456');
//cy.get('button[data-testid=signup-button]').click();

  })
})


    
describe('Sign up Client 2', () => {
  it('Visits the Angular app', () => {
    cy.visit('localhost:4200');
    cy.get('[data-testid=signup]').click();
   // cy.visit('https://material.angular.io/components/dialog/overview')
//  cy.on('window:alert', cy.get(['data-testid=signup-email']).type("ma.gaitsmith@gmail.com")) 
//cy.get('app-adduser').find(['mat-dialog-content']).click()
cy.get('mat-dialog-container').should("be.visible")
 cy.wait(1000)
cy.get('mat-dialog-container').find('input[data-testid=signup-name]').type('Mark'); // find you specify the input?
//https://stackoverflow.com/questions/56520834/selecting-options-from-mat-select-using-cypress
cy.get('mat-select[data-testid=signup-user]').click().get('mat-option').contains('client').click();
cy.get('mat-dialog-container').find('input[data-testid=signup-email]').type('mark.gaitsmith@rmb.co.za');
cy.get('mat-dialog-container').find('input[data-testid=signup-password]').type('123456');


  })
})

describe('Sign up Capturer', () => {
  it('Visits the Angular app', () => {
    cy.visit('localhost:4200');
    cy.get('[data-testid=signup]').click();
   // cy.visit('https://material.angular.io/components/dialog/overview')
//  cy.on('window:alert', cy.get(['data-testid=signup-email']).type("ma.gaitsmith@gmail.com")) 
//cy.get('app-adduser').find(['mat-dialog-content']).click()
cy.get('mat-dialog-container').should("be.visible")
 cy.wait(1000)
cy.get('mat-dialog-container').find('input[data-testid=signup-name]').type('Mr Moyo'); // find you specify the input?
//https://stackoverflow.com/questions/56520834/selecting-options-from-mat-select-using-cypress
cy.get('mat-select[data-testid=signup-user]').click().get('mat-option').contains('capturer').click();
cy.get('mat-dialog-container').find('input[data-testid=signup-email]').type('ma.gaitsmith@gmail.com');
cy.get('mat-dialog-container').find('input[data-testid=signup-password]').type('123456');
cy.get('button[data-testid=signup-button]').click();

  })
})








