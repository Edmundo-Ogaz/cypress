const WAIT = 1000;
const USERNAME = '17030222-2';
const PASSWORD = '30222';
describe('Attention Summary', function(){
    it('Test patient in urgency', function(){
        const URL_PATIENT_URGENCY = 'http://ficha.en.hegc.cl/?patient=1496131&care-manager=2534925&patient-service=2658585#atencion-anterior';
        cy.visit(URL_PATIENT_URGENCY)
        cy.get('input[id=ninAuth]').type(USERNAME)
        cy.get('input[id=userToken]').type(PASSWORD)
        cy.get('button[id=botonValidarClave2]').click()
        cy.wait(WAIT)
        cy.get('#resumenAtencion').click()
        cy.get('.w-action--selected').its('length').should('be.eq', 1)
        cy.get('.w-action--contenido_entrega-turno').its('length').should('be.eq', 1)
        cy.get('.w-action--selected').contains('atención actual')
        cy.get('.w-action--contenido_entrega-turno').contains('Entrega de turno')
    })
    it('Test patient in hospitalization', function(){
        const URL_PATIENT_HOSPITALIZATION = 'http://ficha.en.hegc.cl/?patient=362471&patient-service=2297296&care-manager=1699960&ver-historial=1#resumen-atencion';
        cy.visit(URL_PATIENT_HOSPITALIZATION)
        cy.get('input[id=ninAuth]').type(USERNAME)
        cy.get('input[id=userToken]').type(PASSWORD)
        cy.get('button[id=botonValidarClave2]').click()
        cy.wait(WAIT)
        cy.get('#resumenAtencion').click()
        cy.get('.w-action--selected').its('length').should('be.eq', 1)
        //cy.get('.titulo-principal--tab-off-emerald').its('length').should('be.eq', 2)
        cy.get('.w-action--contenido_historial-resumenes').contains('Historial de resúmenes')
        cy.get('.w-action--contenido_entrega-turno').contains('Entrega de turno')
    })
    it('Test patient in surgical', function(){
        const URL_PATIENT_SURGICAL = 'http://ficha.en.hegc.cl/?patient=804781&care-manager=1700320&patient-service=2297674';
        cy.visit(URL_PATIENT_SURGICAL)
        cy.get('input[id=ninAuth]').type(USERNAME)
        cy.get('input[id=userToken]').type(PASSWORD)
        cy.get('button[id=botonValidarClave2]').click()
        cy.wait(WAIT)
        cy.get('#resumenAtencion').should('not.be.visible')
        // cy.get('.menu-lateral-box-03').click()
        // cy.get('div[name="contenido_cuidados"]').click()
    })
})