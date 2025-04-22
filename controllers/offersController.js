import cloudinary from "../config/cloudinary.js";
import pool from "../config/dbConnection.js";

export const index = (req,res)=>{
  try {
    res.render("exclusive-offers")
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


export const create = async (req, res) => {
  try {
    const { title, info, valid_until, price, currency } = req.body;

    if (!title || !info || !valid_until || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let imageUrl = null;

    // Upload to Cloudinary if an image is provided
   
    if (req.file) {
      // Upload to Cloudinary if an image is provided
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: 'offers',
      });
      imageUrl = uploadResponse.secure_url;
    }

    const query = `
      INSERT INTO Offers (title, info, image_url, valid_until, price, currency) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      info,
      imageUrl || null, // Ensure imageUrl is never undefined
      valid_until,
      price,
      currency || 'SAR' // Set default currency if undefined
    ];

    await pool.execute(query, values);

    res.status(201).json({ message: "Offer created successfully!", imageUrl });

  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ message: "Server error", error });
  }
};