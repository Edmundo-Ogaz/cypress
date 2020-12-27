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
})

it('Case 1 La vista de """"Entrega de turno""""cuando hay entregas de turno annadidas, se mostrará un filtro por fecha exacta', function(){
    cy.get('.date-option').should('have.value', '')
    cy.get('.date-option').type('2020-10-05')
    cy.get('.date-option').should('have.value', '2020-10-05')
})

it('Case 2 Test El título del filtro será "Fecha:"', function(){
    cy.get('.filter > :nth-child(3)').contains('Fecha :').should('be.visible')
})

it('Case 3 Test El título del filtro será "Fecha:"', function(){
    cy.get('[type="date"]').should('be.visible')
})

describe('Case 4 Test Cuando se seleccione una fecha, la vista se filtrará en función de la fecha seleccionada', function(){
    it('should exist', function(){
        cy.get('.date-option').type('2020-10-05').trigger('change');
        cy.wait(WAIT)
        cy.get('.resumen-atencion__visualizar-entrega-turno > .contenido').should('exist')
    })
    it('should not exist', function(){
        cy.get('.date-option').type('2020-10-06').trigger('change');
        cy.wait(WAIT)
        cy.get('.resumen-atencion__visualizar-entrega-turno > .contenido').should('not.exist')
    })
})

it('Case 5 Test Cuando existe una fecha seleccionada en el filtro, mostrará una x en el mismo campo del calendario para resetear el filtro', function(){
    cy.get('.date-reset').should('not.be.visible')
    cy.get('.date-option').type('2020-10-05')
    cy.get('.date-reset').should('be.visible')
    cy.get('.date-reset').click()
    cy.get('.date-option').should('have.value', '')
})

it('Case 6 Test Cuando se selecciones la x, el filtro será reseteado (PBI manda)', function(){
    cy.get('.date-option').type('2020-10-05')
    cy.get('.date-reset').click()
    cy.get('.date-option').should('have.value', '')
})

it('Case 7 Test Por defecto no habrá nada en el filtro de fecha seleccionado', function(){
    cy.get('.date-option').should('have.value', '')
})