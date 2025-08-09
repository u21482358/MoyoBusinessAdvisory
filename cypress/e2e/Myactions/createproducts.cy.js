//const { before } = require("node:test");
let beforeeach = true
beforeEach(() => {
  if(beforeeach){
  console.log('before')
  cy.visit('localhost:4200');
cy.get('[data-testid=username]').type('ma.gaitsmith@gmail.com');
    cy.get('[data-testid=password]').type('123456');
    cy.get('[data-testid=login]').click();


    cy.visit('localhost:4200/product')
   cy.intercept('https://localhost:7267/api/Product/*',(req)=>{
// //      req.continue((res) => {
// //    // res.body.data.listBankAccount = []
  }).as('GetIntercept');
cy.wait('@GetIntercept')
  }
})

//  beforeEach(() => {

 
//  cy.visit('localhost:4200/product')

//  })

afterEach(() => {

  cy.wait(2000)
  cy.get('button[data-testid=add-product-ok]').click();
  

   cy.intercept('POST','https://localhost:7267/api/Product/*').as('PostProduct');

 cy.wait('@PostProduct').then((interception)=>{
 console.log(interception)
//alert("hi")
expect(interception.response.statusCode).to.be.within(200, 299); 

})

})


describe('Create Product', () => {
  it('Creates 1st Product', () => {
   cy.get('[data-testid=add-product]').click();
   cy.wait(1000) // this seems to work.
     cy.get('input[data-testid=add-product-name]').type('Iphone 15')
     // https://stackoverflow.com/questions/68691796/mat-select-drop-down-not-working-with-cypress
      cy.get('mat-select[data-testid=add-product-vendor]').click().get('mat-option[id=option-0]').click();
     cy.get('input[data-testid=add-product-price]').type('15000')
     // https://github.com/cypress-io/cypress/issues/14921
      cy.get('input[data-testid=add-product-quantity]').type('50',{force: true})
   //cy.visit('localhost:4200/product');

    });
  });

  describe('Create Product', () => {
  it('Creates 2nd Product', () => {
    //cy.visit('localhost:4200/product');
    console.log("second method")
   cy.get('[data-testid=add-product]').click();
   cy.wait(1000) // this seems to work.
     cy.get('input[data-testid=add-product-name]').type('Samsung x20')
     // https://stackoverflow.com/questions/68691796/mat-select-drop-down-not-working-with-cypress
      cy.get('mat-select[data-testid=add-product-vendor]').click().get('mat-option[id=option-0]').click();
     cy.get('input[data-testid=add-product-price]').type('17000')
     // https://github.com/cypress-io/cypress/issues/14921
      cy.get('input[data-testid=add-product-quantity]').type('50',{force: true})
   

    });
  });

    describe('Assign 1st Product', () => {
  it('Assigns 1st Product to another Vendor', () => {
    //cy.visit('localhost:4200/product');
    console.log("second method")
   cy.get('button[id=assign-product-0]').click();
   cy.wait(1000) // this seems to work.
     //cy.get('input[data-testid=add-product-name]').type('Huawei 10')
     // https://stackoverflow.com/questions/68691796/mat-select-drop-down-not-working-with-cypress
      cy.get('mat-select[data-testid=add-product-vendor]').click().get('mat-option[id=option-0]').click();
     cy.get('input[data-testid=add-product-price]').type('20000')
     // https://github.com/cypress-io/cypress/issues/14921
      cy.get('input[data-testid=add-product-quantity]').type('100',{force: true})
   beforeeach = false
   afterEach = false

    });

     it('Check Vendors', () => {
    //cy.visit('localhost:4200/product');
    console.log("second method")
   cy.get('button[id=assign-product-0]').click();
   cy.wait(1000) // this seems to work.
     //cy.get('input[data-testid=add-product-name]').type('Huawei 10')
     // https://stackoverflow.com/questions/68691796/mat-select-drop-down-not-working-with-cypress
      cy.get('mat-select[data-testid=add-product-vendor]').click().get('mat-option[id=option-0]').click();
     cy.get('input[data-testid=add-product-price]').type('20000')
     // https://github.com/cypress-io/cypress/issues/14921
      cy.get('input[data-testid=add-product-quantity]').type('100',{force: true})
   beforeeach = false
  
    });
  });


  