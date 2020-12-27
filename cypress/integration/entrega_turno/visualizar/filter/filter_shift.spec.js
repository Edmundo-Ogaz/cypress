const WAIT = 1000;
const USERNAME = '17030222-2';
const PASSWORD = '30222';

before(() => {
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
    cy.wait(WAIT)
})

it('Case 1 La vista de "Entrega de turno", cuando hay entregas de turno añadidas, se mostrará un filtro por "Turno"', function(){
    cy.get('.filter > :nth-child(5)').contains('Turno :').should('be.visible')
    cy.get('.filter > :nth-child(6)').find('option').should('be.visible')
})

it('Case 2 El título del filtro será "TURNO:"', function(){
    cy.get('.filter > :nth-child(5)').contains('Turno :').should('be.visible')
})

it('Case 3 El filtro será de tipo lista', function(){
    cy.get('.filter > :nth-child(6)').find('option').should('have.length', 3)
})

it('Case 4 Se podrá filtrar el turno por, "Largo", "Noche" y "24 horas"', function(){
    cy.get('.filter > :nth-child(6)').select('Largo')
    cy.get('.filter > :nth-child(6)').select('Noche')
    cy.get('.filter > :nth-child(6)').select('24 horas')
})

describe('Case 5 Test Cuando se seleccione una especialidad, la vista se filtrará en función de la especilidad seleccionada', function(){
    it('should exist', function(){
        cy.get('.filter > :nth-child(6)').select('Largo');
        cy.wait(WAIT)
        cy.get('.resumen-atencion__visualizar-entrega-turno > .contenido').should('not.exist')
    })
    it('should not exist', function(){
        cy.get('.filter > :nth-child(6)').select('Noche');
        cy.wait(WAIT)
        cy.get('.resumen-atencion__visualizar-entrega-turno > .contenido').should('not.exist')
    })
})