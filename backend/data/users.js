import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@onlinestore.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Example User',
        email: 'example@onlinestore.com',
        password: bcrypt.hashSync('123456',10)
    },
    {
        name: 'Dummy User',
        email: 'dummy@onlinestore.com',
        password: bcrypt.hashSync('123456',10)
    }
];

export default users;