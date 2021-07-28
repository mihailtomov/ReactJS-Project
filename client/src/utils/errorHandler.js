const errorHandler = (setOnSubmitError, err) => {
    setOnSubmitError(err);

    setTimeout(() => {
        setOnSubmitError({ message: '' });
    }, 3000);
}

export default errorHandler;