const LoginForm = ({ handleSubmit, username, password, handleUserNameChange, handlePasswordChange }) => {

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        data-testid='username'
                        value={username}
                        onChange={handleUserNameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        data-testid='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

    )
}

export default LoginForm