const WAIT = 1000;
const USERNAME = '17030222-2';
const PASSWORD = '30222';
describe('Attention Summary', function(){
    it('Test patient in urgency', function(){
        //const URL_PATIENT_URGENCY = 'https://ficha.en.hegc.cl/?care-manager=2535259&patient=1496211&patient-service=2659097&hash=uevtk0dti2#resumen-atencion';
        const URL_PATIENT_URGENCY = 'http://ficha.en.hegc.cl/?patient=1496131&care-manager=2534925&patient-service=2658585#resumen-atencion';
        cy.visit(URL_PATIENT_URGENCY)
        cy.get('input[id=ninAuth]').type(USERNAME)
        cy.get('input[id=userToken]').type(PASSWORD)
        cy.get('button[id=botonValidarClave2]').click()
        cy.wait(WAIT)
        cy.get('.w-action--contenido_entrega-turno').click()
        cy.wait(WAIT)
        cy.wait(WAIT)
        cy.wait(WAIT)
        cy.get('.editar').click()
        cy.wait(WAIT)
        cy.get('.resumen-atencion__editar-entrega-turno__footer > :nth-child(2)').click()
        cy.wait(WAIT)
        cy.get('.w-dialog--question-emphasis > .w-modal > .w-modal__footer > .w-action--primary').click()
        cy.wait(WAIT)
        cy.get('.new-shift-btn').click()
        cy.wait(WAIT)
        cy.get('.filter > :nth-child(2)').should('have.value', null)
        cy.get('.date-option').should('have.value', '')
        cy.get('.filter > :nth-child(6)').should('have.value', null)
        cy.get(':nth-child(3) > .container > textarea').should('have.value', '')
        cy.get(':nth-child(4) > .container > textarea').should('have.value', '')
        cy.get(':nth-child(5) > .container > textarea').should('have.value', '')
    })

    
})