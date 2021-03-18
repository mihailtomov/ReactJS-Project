const Login = () => {
    return (
        <section>
            <h2>Login</h2>
            <div>
                <form>
                    <label>Username:</label>
                    <input type="text" />
                    <label>Password:</label>
                    <input type="password" />
                    <input type="submit" value="Login" />
                </form>
            </div>
        </section>
    );
}

export default Login;