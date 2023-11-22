const db = require('../config/db')
const { v4: uuidv4 } = require('uuid');


const save_admin = async (data) => {
  const { adminname, email, Set_password, Confirm_password } = data;

  try {
      const query = 'INSERT INTO admin.admin_auth (adminname, email, Set_password, Confirm_password) VALUES ($1, $2, $3, $4)';
      const values = [adminname, email, Set_password, Confirm_password];

      const result = await db.query(query, values);

      return result.rowCount;
  } catch (err) {
      console.error('Error executing query:', err);
      throw err;
  }
};

const getAdminById = async (adminid) => {
  try {
    const query = `SELECT * FROM admin.admin_auth WHERE adminid = $1`;
    const result = await db.query(query, [adminid]);

    return result.rows[0]; 
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
};

const getAllAdmins = async () => {
  try {
    const query = 'SELECT * FROM admin.admin_auth';
    const result = await db.query(query);

    return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
};

const loginAdmin = async (adminid, Set_password) => {
  try {
    const query = 'SELECT * FROM admin.admin_auth WHERE adminid = $1 AND Set_password = $2';
    const result = await db.query(query, [adminid, Set_password]);

    return result.rows[0]; // Return the admin data if found
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
};


const updateAdminDetails = async (adminId, updatedFields) => {
  try {
    const {
      adminname,
      email,
      Set_password,
      Confirm_password
    } = updatedFields;

    const updateFields = [];
    const values = [adminId];

    if (adminname !== undefined) {
      updateFields.push(`adminname = $${values.length + 1}`);
      values.push(adminname);
    }
    if (email !== undefined) {
      updateFields.push(`email = $${values.length + 1}`);
      values.push(email);
    }
    if (Set_password !== undefined) {
      updateFields.push(`Set_password = $${values.length + 1}`);
      values.push(Set_password);
    }
    if (Confirm_password !== undefined) {
      updateFields.push(`Confirm_password = $${values.length + 1}`);
      values.push(Confirm_password);
    }

    const updateQuery = `
      UPDATE admin.admin_auth 
      SET ${updateFields.join(', ')}
      WHERE adminid = $1
    `;
    
    const result = await db.query(updateQuery, values);

    return result.rowCount; // Returns the number of rows affected by the update
  } catch (err) {
    console.error('Error executing update query:', err);
    throw err;
  }
};
const deleteAdmin = async (adminId) => {
  try {
    const query = 'DELETE FROM admin.admin_auth WHERE adminid = $1';
    const result = await db.query(query, [adminId]);

    return result.rowCount; // Returns the number of rows affected by the deletion
  } catch (err) {
    console.error('Error executing delete query:', err);
    throw err;
  }
};
module.exports = 
{save_admin,
 getAdminById,
 getAllAdmins,
 loginAdmin,
 updateAdminDetails,
 deleteAdmin
}
