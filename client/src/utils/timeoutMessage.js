const timeoutMessage = (messageSetter, milliseconds) => {
    return setTimeout(() => {
        messageSetter(false);
    }, milliseconds)
}

export default timeoutMessage;