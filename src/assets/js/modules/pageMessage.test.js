// Render page
import '@test/jest/helpers/renderHtmlPage'
// Module
import pageMessage from '@/assets/js/modules/pageMessage'

// Data
const errorMessage = {
  type: 'error',
  message: 'Houve um erro ao carregar os dados'
}

describe('pageMessage.js', () => {
  test('should not be visible when page load', () => {
    const messageElement = document.getElementById('message-element')

    expect(messageElement.classList.contains('page-message--visible')).toBeFalsy()
  })

  test('should thrown an error if some data is missing', () => {
    expect(() => pageMessage.show({})).toThrowError('Dados inválidos')
  })

  test('should be visible if the message data is correct', () => {
    pageMessage.show(errorMessage)

    const messageElement = document.getElementById('message-element')
    const messageTextElement = document.getElementById('message-text')

    expect(messageElement.classList.contains('page-message--visible')).toBeTruthy()
    expect(messageElement.classList.contains('page-message--error')).toBeTruthy()
    expect(messageTextElement.innerText).toBe(errorMessage.message)
  })

  test('should can close the message when click in close button', () => {
    pageMessage.show(errorMessage)

    let closeActionElement = document.getElementById('message-close')
    
    closeActionElement.click()
    
    const messageElement = document.getElementById('message-element')
    const messageTextElement = document.getElementById('message-text')
    expect(messageElement.classList.contains('page-message--visible')).toBeFalsy()
    expect(messageElement.classList.contains('page-message--error')).toBeFalsy()
    expect(messageTextElement.innerText).toBe('')
  })
})