const Register = () => {
    return (
        <section>
            <h2>Register</h2>
            <div>
                <form>
                    <label>Username:</label>
                    <input type="text" />
                    <label>Password:</label>
                    <input type="password" />
                    <label>Repeat password:</label>
                    <input type="password" />
                    <input type="submit" value="Register" />
                </form>
            </div>
        </section>
    );
}

export default Register;