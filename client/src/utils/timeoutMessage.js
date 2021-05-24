const timeoutMessage = (messageSetter, milliseconds) => {
    return setTimeout(() => {
        messageSetter({ state: false, type: '' });
    }, milliseconds)
}

export default timeoutMessage;