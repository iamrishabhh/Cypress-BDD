/// <reference types="cypress" />
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import flipkart from "../Pages/FlipkartPage.cy";
import { should } from "chai";

beforeEach(() => {
    // browser with a 720p monitor
    cy.viewport(1280, 800)
})

let productTitle10, productTitle11, productDisplayedPrice;

Given("I visit flipkart website", () => {
    flipkart.visitURL();
});

// And("I close the login module pop-up window", () => {
//     flipkart.closeLgoginModule();
// });


Then("I click on the global search module", () => {
    flipkart.clickOnSearch();
});

And("I search for keyword mobile", (datatable) => {

    datatable.hashes().forEach((element) => {

        flipkart.searchFor(element.keyword);
    });
});



Then('I verify the search results message', () => {
    flipkart.verifySearchResults();
});

And('I added {int}th and {int}th phone to compare tray', (nth1, nth2) => {

    // Logging the mobile product number that are going to be added to compare
    cy.log(nth1);
    cy.log(nth2);

    // creating a variable for product title className
    var productClass='div[class="_4rR01T"]';
    // Extract product titles
    
    // created empty array to store the product titles
    const productTexts = [];

    cy.get(productClass).eq(nth1 - 1).invoke('text').then(text => {
        productTitle10 = text.trim();
        productTexts.push(`Product ${nth1}th: `+productTitle10);
    }).then(() => {
        cy.get(productClass).eq(nth2 - 1).invoke('text').then(text => {
            productTitle11 = text.trim();
            productTexts.push(`Product ${nth2}th: `+productTitle11);
    }).then(() => {
        // storing the text file at below loction
        cy.writeFile('cypress/downloads/AddedProductsToCompare.txt', productTexts.join('\n'), (err) => {
            if (err) throw err;
            cy.log(`Product texts saved to ${path}`);
        });
    }).then(() => {
        // Adding the products in the compare tray
            flipkart.addToCompare(nth1);
            flipkart.addToCompare(nth2);
        });
    });

    // Verify the compare button is visible
    flipkart.verifyCompareBtn();
    
    // Log the product titles after they have been retrieved from the UI
    cy.wrap().then(() => {
        cy.log(`Added ${productTitle10} and ${productTitle11} to compare tray successfully.`);
    });

    

});

And("I click on the {int}th phone name", (nth) => {

    cy.get('a[class="_1fQZEK"]').eq(nth - 1).invoke('removeAttr','target').click();
    cy.contains(productTitle11).should('be.visible');

    cy.get('.CEmiEU > ._25b18c > ._30jeq3').invoke('text').then((text) =>{
        productDisplayedPrice = text;
        cy.log(productDisplayedPrice);
    });
    
});

And("I add the product to cart", () => {
    cy.contains('Add to cart').should('be.visible');
    cy.wait(3000);
    // full xpath
    cy.xpath('/html/body/div[1]/div/div[3]/div[1]/div[1]/div[2]/div/ul/li[1]/button').click({force: true});
});

Then("I verify the button name change to going to cart and item is added to cart", () => {
    cy.contains('Going to cart').should('be.visible');
});

And("I verify the total amount displayed is the same as was displayed on the products list page", () => {
    cy.get('div[class="z4Ha90"]').invoke('text').then((text) => {
        let productTotalPrice = text;
        if(productDisplayedPrice === productTotalPrice){
            cy.log("Price is matched successfully");
        }
    });
});

Then("I increase the product quantity by one, and verify the pop-up message of quantity increase", () => {
    flipkart.increaseQuantity();
    cy.wait(5000);
    cy.contains(`You've changed '${productTitle11}' QUANTITY to '2'`).should('be.visible');
});


Then("I click on remove option and verify the pop-up displayed", () => {
    cy.contains('Remove').click();
    cy.contains('Are you sure you want to remove this item?').should('be.visible');
});

And("I remove the product from the cart", () =>{
    cy.get('div._3dsJAO._24d-qY.FhkMJZ').click();
    //cy.contains('Remove').click();
});


Then("I verify the removal message", () => {
    cy.contains(`Successfully removed ${productTitle11} from your cart`).should('be.visible');
});


And("I verify the empty cart message screen", () => {
    cy.contains('Missing Cart items?').should('be.visible');
    cy.contains('Login to see the items you added previously').should('be.visible');
});


//Successfully removed Motorola G34 5G (Charcoal Black, 128 GB) from your cart

// When("I entered valid credential", (datatable) => {
//     datatable.hashes().forEach((element) => {
//         login.enterUserNamePassword(element.email, element.validpassword);
//         login.clickSubmitButton()
//     });
// });


// And("User click on sign in button", () => {
//     login.clickSubmitButton();
// });


// Then("Validate the title after login", () => {
//     login.verifyPageTitle();
// });