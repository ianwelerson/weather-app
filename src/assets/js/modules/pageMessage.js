// Element
const messageElementId = 'message-element'
const messageTextElementId = 'message-text'
const closeMessageElementId = 'message-close'
// Allowed message type
const messageTypes = ['success', 'error']


const pageMessage = {
  show: ({ type, message }) => {
    // Check if has type, if the type is allowed and if has message
    if (!type || !messageTypes.includes(type) || !message) {
      throw new Error ('Dados inválidos')
    }

    const { messageElement, messageTextElement, closeActionElement } = { ...getElements() }

    if (!messageElement || !messageTextElement || !closeActionElement) {
      return
    }
    
    // Message
    messageTextElement.innerText = message
    // Classes
    messageElement.classList.add('page-message--visible')
    messageElement.classList.add(`page-message--${type}`)
    // Close event
    closeActionElement.addEventListener('click', pageMessage.close)
  },
  close: () => {
    const { messageElement, messageTextElement, closeActionElement } = { ...getElements() }

    if (!messageElement || !messageTextElement || !closeActionElement) {
      return
    }

    messageElement.classList.remove('page-message--visible')
    // Remove state classes
    messageElement.classList.remove('page-message--error')
    messageElement.classList.remove('page-message--success')
    // Clear message
    messageTextElement.innerText = ''
    // Remove event
    closeActionElement.removeEventListener('click', pageMessage.close)
  }
}

function getElements () {
  try {
    return {
      messageElement: document.getElementById(messageElementId),
      messageTextElement: document.getElementById(messageTextElementId),
      closeActionElement: document.getElementById(closeMessageElementId)
    }
  } catch (error) {
    return {}
  }
}

export default pageMessage