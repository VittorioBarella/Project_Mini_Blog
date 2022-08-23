
const Register = () => {
    return (
        <div>
            <h1>Register to post something</h1>
            <p>Create your user and share your memories</p>
            <form>
                <label>
                    <span>Name:</span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="User name" />
                </label>
                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="User email" />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter your password" />
                </label>
                <label>
                    <span>Confirm your password:</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirm your password" />
                </label>
                <button className="btn"> Log in or Register</button>
            </form>
        </div>
    );
};

export default Register;