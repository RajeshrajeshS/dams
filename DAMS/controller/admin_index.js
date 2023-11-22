const db1 = require('./admin_services');

const save_admin1 = async(req,res)=>{
    try {

        const adminData = req.body;
        const rowCount = await db1.save_admin(adminData);
        res.status(201).json({ message: `${rowCount} row(s) inserted successfully.` });
      } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const get_admin = async (req, res) => {
  const adminId = req.query.adminid;


  try {
    const adminData = await db1.getAdminById(adminId);
    
    console.log(adminData)

    if (adminData) {
      res.status(200).json(adminData);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error retrieving admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const get_all_admins = async (req, res) => {
  try {
    const allAdmins = await db1.getAllAdmins();

    if (allAdmins.length > 0) {
      res.status(200).json(allAdmins);
    } else {
      res.status(404).json({ message: 'No admins found' });
    }
  } catch (error) {
    console.error('Error retrieving admins:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login_admin = async (req, res) => {
  const { adminid, Set_password } = req.body;

  try {
    const adminData = await db1.loginAdmin(adminid, Set_password);

    if (adminData) {
      res.status(200).json({ message: 'Login successful', adminData });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const update_admin_details = async (req, res) => {
  const adminId = req.params.adminid;
  const updatedFields = req.body;

  try {
    const rowCount = await db1.updateAdminDetails(adminId, updatedFields);

    if (rowCount > 0) {
      res.status(200).json({ message: 'Admin details updated successfully' });
    } else {
      res.status(404).json({ message: 'Admin not found or no changes made' });
    }
  } catch (error) {
    console.error('Error during admin details update:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const delete_admin = async (req, res) => {
  const adminId = req.params.adminid;

  try {
    const rowCount = await db1.deleteAdmin(adminId);

    if (rowCount > 0) {
      res.status(200).json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ message: 'Admin not found or already deleted' });
    }
  } catch (error) {
    console.error('Error during admin deletion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = 
{save_admin1,
get_admin,
get_all_admins,
login_admin,
update_admin_details,
delete_admin
}