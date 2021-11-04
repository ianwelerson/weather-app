describe('Accessing the forecast', () => {
  before(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/location/*',
      },
      {
        fixture: 'woeid.json'
      }
    ).as('getWoeidData')

    cy.visit('http://localhost:8000')
  })

  describe('Viewing the forecast', () => {
    it('Today\'s forecast', () => {
      // Icon
      cy.get('[data-testid=today-forecast-icon]').should('have.attr', 'src').should('include','hc')
      // Icon background
      cy.get('[data-testid=today-forecast-icon-bg]').should('have.class', 'state-image--show-cloud')
      // Temperature
      cy.get('[data-testid=today-forecast-temperature]').should('have.text', '18.5')
      // Temperature Unit
      cy.get('[data-testid=today-forecast-temperature-unit]').should('have.text', '°C')
      // Forecast name
      cy.get('[data-testid=today-forecast-name]').should('have.text', 'Heavy Cloud')
      // Date
      cy.get('[data-testid=today-forecast-date]').should('have.text', 'Fri, Sep 10')
      // Location
      cy.get('[data-testid=today-forecast-location]').should('have.text', 'Calgary')
    })
  
    it('Today\'s hightlights', () => {
      // Wind Speed
      cy.get('[data-testid=today-hightlight-wind-speed-number]').should('have.text', '4.18')
      // Wind Arrow
      cy.get('[data-testid=today-hightlight-wind-direction-arrow]').should('have.attr', 'style').should('contain', 'transform: rotate(101.867deg)')
      // Humidity
      cy.get('[data-testid=today-hightlight-humidity-number]').should('have.text', '60')
      // Humidity Bar
      cy.get('[data-testid=today-hightlight-humidity-bar]').should('have.attr', 'style').should('contain', 'width: 60%')
      // Visibility
      cy.get('[data-testid=today-hightlight-visibility-number]').should('have.text', '13.86')
      // Air Pressure
      cy.get('[data-testid=today-hightlight-air-pressure-number]').should('have.text', '1015')
    })
  
    it('Next days forecast', () => {
      // Title
      cy.get('[data-testid=next-day-title]').eq(0).should('have.text', 'Sat, Sep 11')
      // Icon
      cy.get('[data-testid=next-day-icon]').eq(0).should('have.attr', 'src').should('include','hr')
      // Max. Temperature
      cy.get('[data-testid=next-day-max]').eq(0).should('have.text', '15 °C')
      // Min. Temperature
      cy.get('[data-testid=next-day-min]').eq(0).should('have.text', '9.6 °C')
    })
  })

  describe.skip('Using device location', () => {
    // TODO
  })

  describe.skip('Searching for a location', () => {
    // TODO
  })
})