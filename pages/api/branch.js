import DB from "../../models";
import connectDB from "../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallBranches(req, res);
      break;
    case "POST":
      await saveBranch(req, res);
      break;
    case "PUT":
      await updateBranch(req, res);
      break;
  }
};

const getallBranches = async (req, res) => {
  try {
    const branches = await DB.Branch.find({});
    res.status(200).json(branches);
  } catch (err) {
    console.log(err);
  }
};

const saveBranch = async (req, res) => {
  const { name, email, address, phone } = req.body;
  try {
    if (!name || !email) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const Branch = await DB.Branch({
      name,
      email,
      address,
      phone,
    }).save();
    res.status(201).json({ message: "New Branch added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateBranch = async (req, res) => {
  let branchData = {};
  const data = req.body;
  if (data.name) branchData.name = data.name;
  if (data.email) branchData.email = data.email;
  if (data.address) branchData.address = data.address;
  if (data.phone) branchData.phone = data.phone;

  const branch_record = await DB.Branch.findByIdAndUpdate(data.id, branchData);
  if (branch_record) {
    res.status(200).json({ message: "Branch updated successfully" });
  } else {
    return res.status(422).json({ error: "Error updating branch" });
  }
};
