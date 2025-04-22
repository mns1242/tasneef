import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const adminLogin = async (req, res) => {
  
  const { username, password } = req.body;

  try {
    // Check if admin exists
    const [rows] = await db.execute("SELECT * FROM admins WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const admin = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT Token
    const token = generateTokenAndSetCookie({ id: admin.id, username: admin.username },res);
    // const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    res.json({ message: "Login successful",user:{ id: admin.id, username: admin.username }, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}