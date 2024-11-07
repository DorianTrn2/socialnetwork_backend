const authService = require('../services/authService');

async function register(req, res) {
    try{
        const{email, login, password, role_id, firstname, lastname, birthday} = req.body;
        await authService.registerUser({ email, login, password, role_id, firstname, lastname, birthday });
        res.status(201).json({ message: 'User registered successfully' });
    }catch(error){
        res.status(500).json({ error: 'Registration failed' });
    }
}

async function login(req, res) {
    try{
        const{login, password} = req.body;
        const result = await authService.authenticateUser(login, password);
        if(!result){
            return res.status(401).json({ error: 'Authentication failed' });
        }
        res.cookie('token', result.token, { httpOnly: true , maxAge: 3600000 });
        res.status(200).json({ message: 'Login successful' });
    }catch(error){
        res.status(500).json({ error: 'Login failed' });
    }
}

async function logout(req, res) {
    try{
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    }catch(error){
        res.status(500).json({ error: 'Logout failed' });
    }
}

module.exports = {
    register,
    login,
    logout
};
