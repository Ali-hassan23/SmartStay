const bcrypt = require('bcryptjs');
const pool = require('./db');

// async function encryptPasswords() {
//     try {
//         // Retrieve admins from the database
//         const getAdminsQuery = 'SELECT username, password FROM admin';
//         const { rows: admins } = await pool.query(getAdminsQuery);
//         console.log(admins);

//         // Iterate over each admin and hash their plaintext password
//         for (const admin of admins) {
//             const hashedPassword = await bcrypt.hash(admin.password, 10); // Hash password with bcrypt
//             const updateAdminQuery = 'UPDATE admin SET password = $1 WHERE username = $2';
//             await pool.query(updateAdminQuery, [hashedPassword, admin.username]); // Update password in the database
//             console.log(`Password encrypted for admin with username ${admin.username}`);
//         }

//         console.log('All passwords encrypted successfully.');
//     } catch (error) {
//         console.error('Error encrypting passwords:', error);
//     }
// }

//Encrypt passwords for Customers
async function encryptPasswords() {
    try {
        // Retrieve customers from the database
        const getCustomersQuery = 'SELECT email,password FROM Customer';
        const { rows: customers } = await pool.query(getCustomersQuery);
        console.log(customers);

        // Iterate over each customer and hash their plain text password
        for (const customer of customers) {
            const hashedPassword = await bcrypt.hash(customer.password, 10); // Hash password with bcrypt
            const updateCustomerQuery = 'UPDATE Customer SET password = $1 WHERE email = $2';
            await pool.query(updateCustomerQuery, [hashedPassword, customer.email]); // Update password in the database
            console.log(`Password encrypted for admin with username ${customer.email}`);
        }

        console.log('All passwords encrypted successfully.');
    } catch (error) {
        console.error('Error encrypting passwords:', error);
    }
}

// Call the function to start encrypting passwords for admin table
encryptPasswords();

 