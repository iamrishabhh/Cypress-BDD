class FlipkarPage {

    visitURL(){
        cy.visit("https://www.flipkart.com");
    }

    closeLgoginModule(){
        cy.get('span[class="_30XB9F"]').click();
    }


    clickOnSearch(){
        cy.get('input[placeholder="Search for Products, Brands and More"]').click();
    }

    searchFor(keyword){
        cy.get('input[placeholder="Search for Products, Brands and More"]').type(keyword).type('{enter}');

    }

    verifySearchResults(){
        cy.get('span[class="_10Ermr"]').should('contain', 'Showing 1 – 24 of').and('contain', 'results for "mobile"');
    }


    addToCompare(productNo){
        cy.get('span[class="f3A4_V"]').eq(productNo - 1).click();
    }

    verifyCompareBtn(){
        cy.get('span[class="_3hShhO"]').should('be.visible');
    }

    increaseQuantity(){
        //cy.xpath('//*[@id="container"]/div/div[2]/div/div/div[1]/div/div[2]/div/div[3]/div[1]/div/button[2]').click();
        cy.get('._3dY_ZR > :nth-child(3)').click({force: true});
    }
}

const flipkart = new FlipkarPage();
export default flipkart;