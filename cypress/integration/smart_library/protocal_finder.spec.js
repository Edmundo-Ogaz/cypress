before(() => {
    cy.setCookie('sessionUser', '{"name":"JOSE PABLO RIQUELME PADRON"}')
    const URL_PATIENT_URGENCY = 'http://smart-library.en.hegc.cl/#/protocol-finder';
    cy.visit(URL_PATIENT_URGENCY)
})

it('header not visible in protocol finder', function(){
    cy.get('.w-protocol-finder').find('.w-window__header').should('be.not.visible')
})

it('filter not be enabled', function(){
    cy.get('.w-protocol-finder__speality-selector > .w-typeahead__input').should('be.disabled')
    cy.get('.w-protocol-finder__group-selector > .w-typeahead__input').should('be.disabled')
})

it('buton new protocal visible and contain text "Nuevo protocolo"', function(){
    cy.get('.w-protocol-finder__toolbar > .w-action').should('be.visible')
    cy.get('.w-protocol-finder__toolbar > .w-action > .w-label').contains('Nuevo protocolo')
})

it('header table should be bisible and contain the required text"', function(){
    cy.get('.w-table-header__cell--protocol-name').should('be.visible')
    cy.get('.w-table-header__cell--protocol-name').contains('NOMBRE PROTOCOLO')
    cy.get('.w-table-header__cell-diagnostic').should('be.visible')
    cy.get('.w-table-header__cell-diagnostic').contains('DIAGNÓSTICO')
    cy.get('.w-table-header__cell-description').should('be.visible')
    cy.get('.w-table-header__cell-description').contains('DESCRIPCIÓN')
    cy.get('.w-table-header__cell-version').should('be.visible')
    cy.get('.w-table-header__cell-version').contains('VERSIÔN')
    cy.get('.w-table-header__cell-state').should('be.visible')
    cy.get('.w-table-header__cell-state').contains('ESTADO')
    cy.get('.w-table-header__cell-last-update').should('be.visible')
    cy.get('.w-table-header__cell-last-update').contains('ÚLTIMA ACTUALIZACIÓN')
    cy.get('.w-table-header__cell-actions').should('be.visible')
    cy.get('.w-table-header__cell-actions').contains('ACCIONES')
})

it('list of table"', function(){
    cy
    .get('.w-protocol-finder__main-table > .w-table-body > .w-table-body__row')
    .within(($tr) => {
        cy.get('td')
        .each(($td, indexTd, $list) => {
            if ($td.hasClass('w-table-cell__state--active')) {
                cy.wrap($td).contains('Activo')
                cy.wrap($td).parent('.w-table-body__row')
                    .children('.w-table-body__cell-actions')
                    .children('.w-table-cell__action')
                    .first().should('have.class', 'w-table-cell__action-see')
                    .next().should('have.class', 'w-table-cell__action-disable')
            } else if ($td.hasClass('w-table-cell__state--draft')) {
                cy.wrap($td).contains('Borrador')
                cy.wrap($td).parent('.w-table-body__row')
                    .children('.w-table-body__cell-actions')
                    .children('.w-table-cell__action')
                    .first().should('have.class', 'w-table-cell__action-see')
                    .next().should('have.class', 'w-table-cell__action-enable')
                     .next().should('have.class', 'w-table-cell__action-delete')
            }
        })
    })
})

it('get list of past protocols"', function(){
    cy.get('.w-protocol-finder__past-protocol-toolbar > .w-action > .w-label').contains('Mostrar protocolos anteriores')
    cy.get('.w-protocol-finder__past-protocol-toolbar > .w-action > .w-label').click()
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell--protocol-name').should('be.visible')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell--protocol-name').contains('PROTOCOLOS ANTERIORES')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-diagnostic').should('be.visible')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-diagnostic').contains('DIAGNÓSTICO')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-description').should('be.visible')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-description').contains('DESCRIPCIÓN')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-version').should('be.visible')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-version').contains('VERSIÔN')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-state').should('be.visible')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-state').contains('ESTADO')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-last-update').should('be.visible')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-last-update').contains('ÚLTIMA ACTUALIZACIÓN')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-actions').should('be.visible')
    cy.get('.w-protocol-finder__main-table-past > .w-table-header > .w-table-header__row > .w-table-header__cell-actions').contains('ACCIONES')
})

it('list of past protocols"', function(){
    cy
    .get('.w-protocol-finder__main-table-past > .w-table__body > .w-table-body__row')
    .within(($tr) => {
        cy.get('td')
        .each(($td, index, $list) => {
            if ($td.hasClass('w-table-cell__state--disabled')) {
                // console.log(index)
                cy.wrap($td).contains('Desactivado')
                cy.wrap($td).parent('.w-table-body__row')
                    .children('.w-table-body__cell-actions')
                    .children('.w-table-cell__action')
                    .first().should('have.class', 'w-table-cell__action-see')
                    .next().should('have.class', 'w-table-cell__action-reactivate')
            } else if ($td.hasClass('w-table-cell__state--deleted')) {
                // console.log(index)
                cy.wrap($td).contains('Eliminado')
                cy.wrap($td).parent('.w-table-body__row')
                    .children('.w-table-body__cell-actions')
                    .children('.w-table-cell__action')
                    .first().should('have.class', 'w-table-cell__action-see')
                    .first('contain', 'w-table-cell__action-see')
                    .next().should('have.class', 'w-table-cell__action-reactivate')
            }
        })
    })
})

it('see protocol"', function(){
    cy
    .get('.w-protocol-finder__active-protocols > .w-panel__body > .w-table > .w-table-body > :nth-child(1) > .w-table-body__cell-actions > .w-table-cell__action-see')
    .should('be.visible')
    .get('.w-protocol-finder__active-protocols > .w-panel__body > .w-table > .w-table-body > :nth-child(1) > .w-table-body__cell-actions > .w-table-cell__action-see')
    .click()
    cy.get('.w-protocol-viewer').find('.w-window__header').should('be.visible')
    cy.get('.w-protocol-viewer__main-title > .w-title__label')
    .should('be.visible')
    //cy.get('.w-protocol-viewer > .w-window__header > .w-window__head > .w-action').click()
    //cy.get('.w-protocol-finder').should('be.visible')
})

it('disable and active protocol"', function(){
    let finded = false, description, pastDescription;
    cy.get('.w-protocol-finder__main-table > .w-table-body > .w-table-body__row')
    .within(($tr) => {
        cy.get('td')
        .each(($td) => {
            if ($td.hasClass('w-table-cell__state--active')) {
                cy.wrap($td)
                .parent('.w-table-body__row')
                .children('.w-table-body__cell-description')
                .then(($description) => {
                    description = $description.text()
                })
                cy.wrap($td)
                .parent('.w-table-body__row')
                .children('.w-table-body__cell-actions')
                .children('.w-table-cell__action-disable')
                .click()
                return false
            }
        })
    })
    .then(() => {
        cy.get('.w-dialog--question-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
        .should('be.visible')
        cy.get('.w-dialog--question-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
        .click()
    })
    .then(() => {
        cy.get('.w-protocol-finder__past-protocol-toolbar > .w-action > .w-label')
        .contains('Mostrar protocolos anteriores')
        .then(() => {
            cy.get('.w-protocol-finder__past-protocol-toolbar > .w-action > .w-label').click()
        })
    })
    .then(() => {
        cy.wait(3000)
    })
    .then(() => {
        cy.get('.w-protocol-finder__main-table-past > .w-table__body > .w-table-body__row')
        .within(($tr) => {
            cy.get('td')
            .each(($td) => {
                if ($td.hasClass('w-table-cell__state--disabled')) {
                    cy.wrap($td)
                    .parent('.w-table-body__row')
                    .children('.w-table-body__cell-description')
                    .then(($description) => {
                        pastDescription = $description.text()
                    })
                    .then(() => {
                        if ( description === pastDescription ) {
                            console.log('finded true')
                            finded = true;
                            cy.wrap($td)
                            .parent('.w-table-body__row')
                            .children('.w-table-body__cell-actions')
                            .children('.w-table-cell__action-reactivate')
                            .click()
                            return false
                        }
                    })
                }
            })
        })
        .then(() => {
            expect(finded).to.equal(true)
        })
        .then(() => {
            cy
            .get('.w-dialog--question-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
            .click()
        })
    })
})

it('active protocol"', function(){
    let finded = false, description, pastDescription;
    cy.get('.w-protocol-finder__main-table > .w-table-body > .w-table-body__row')
    .within(($tr) => {
        cy.get('td')
        .each(($td) => {
            if ($td.hasClass('w-table-cell__state--draft')) {
                cy.wrap($td)
                .parent('.w-table-body__row')
                .children('.w-table-body__cell-description')
                .then(($description) => {
                    description = $description.text()
                })
                cy.wrap($td)
                .parent('.w-table-body__row')
                .children('.w-table-body__cell-actions')
                .children('.w-table-cell__action-enable')
                .click()
                return false
            }
        })
    })
    .then(() => {
        cy.get('.w-dialog--question-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
        .should('be.visible')
        cy.get('.w-dialog--question-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
        .click()
    })
    .then(() => {
        cy.wait(3000)
    })
    .then(() => {
        cy.get('.w-protocol-finder__main-table > .w-table-body > .w-table-body__row')
        .within(($tr) => {
            cy.get('td')
            .each(($td) => {
                if ($td.hasClass('w-table-cell__state--active')) {
                    cy.wrap($td)
                    .parent('.w-table-body__row')
                    .children('.w-table-body__cell-description')
                    .then(($description) => {
                        pastDescription = $description.text()
                    })
                    .then(() => {
                        if ( description === pastDescription ) {
                            console.log('finded true')
                            finded = true;
                            return false
                        }
                    })
                }
            })
        })
        .then(() => {
            expect(finded).to.equal(true)
        })
    })
})

it('delete and undelete protocol"', function(){
    let finded = false, description, pastDescription;
    cy.get('.w-protocol-finder__main-table > .w-table-body > .w-table-body__row')
    .within(($tr) => {
        cy.get('td')
        .each(($td) => {
            if ($td.hasClass('w-table-cell__state--draft')) {
                cy.wrap($td)
                .parent('.w-table-body__row')
                .children('.w-table-body__cell-description')
                .then(($description) => {
                    description = $description.text()
                })
                cy.wrap($td)
                .parent('.w-table-body__row')
                .children('.w-table-body__cell-actions')
                .children('.w-table-cell__action-delete')
                .click()
                return false
            }
        })
    })
    .then(() => {
        cy.get('.w-dialog--question-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
        .should('be.visible')
        cy.get('.w-dialog--question-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
        .click()
    })
    .then(() => {
        cy.get('.w-protocol-finder__past-protocol-toolbar > .w-action > .w-label')
        .contains('Mostrar protocolos anteriores')
        .then(() => {
            cy.get('.w-protocol-finder__past-protocol-toolbar > .w-action > .w-label').click()
        })
    })
    .then(() => {
        cy.wait(3000)
    })
    .then(() => {
        cy.get('.w-protocol-finder__main-table-past > .w-table__body > .w-table-body__row')
        .within(($tr) => {
            cy.get('td')
            .each(($td) => {
                if ($td.hasClass('w-table-cell__state--deleted')) {
                    cy.wrap($td)
                    .parent('.w-table-body__row')
                    .children('.w-table-body__cell-description')
                    .then(($description) => {
                        pastDescription = $description.text()
                    })
                    .then(() => {
                        if ( description === pastDescription ) {
                            console.log('finded true')
                            finded = true;
                            cy.wrap($td)
                            .parent('.w-table-body__row')
                            .children('.w-table-body__cell-actions')
                            .children('.w-table-cell__action-reactivate')
                            .click()
                            return false
                        }
                    })
                }
            })
        })
        .then(() => {
            expect(finded).to.equal(true)
        })
        .then(() => {
            cy
            .get('.w-dialog--question-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
            .click()
        })
    })
})

it('save new protocal"', function(){
    cy.get('.w-protocol-finder__toolbar > .w-action').should('be.visible')
    cy.get('.w-protocol-finder__toolbar > .w-action > .w-label').contains('Nuevo protocolo')
    cy.get('.w-protocol-finder__toolbar > .w-action > .w-label').click()

    cy.get('.w-new-protocol__form > .w-new-protocol__protocol-name')
      .find('[type="text"]').type('CYPRESS')

    cy.get('.w-new-protocol__form > .w-new-protocol__diagnostic')
      .find('[type="text"]').type('abd')

    cy.wait(2000)

    cy.get('.w-new-protocol__form > .w-new-protocol__diagnostic > .w-typeahead > .w-typeahead__selector').first().click()

    cy.get('.w-new-protocol__form > .w-new-protocol__description')
      .find('textarea').type('init CYPRESS')

    cy.get('.w-new-protocol > .w-modal__root > .w-modal__footer > .w-action--primary')
    .click()
    .then(() => {
        cy.wait(2000)
    })
    .then(() => {
        cy.get('.w-dialog--info-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
        .should('be.visible')
        cy.get('.w-dialog--info-emphasis > .w-modal__root > .w-modal__footer > .w-action--primary')
        .click()
    })
    .then(() => {
        cy.get('.w-protocol-viewer').find('.w-window__header').should('be.visible')
        cy.get('.w-protocol-viewer__main-title > .w-title__label')
        .should('be.visible')
        cy.get('.w-protocol-viewer__sub-title > .w-title__label').contains('CYPRESS')
    })
})