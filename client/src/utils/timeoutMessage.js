const timeoutMessage = (messageSetter, milliseconds) => {
    return setTimeout(() => {
        messageSetter({ state: false });
    }, milliseconds)
}

export default timeoutMessage;