import cloudinary from "../config/cloudinary.js";
import pool from "../config/dbConnection.js";

export const index = async (req,res)=>{
  try {
    const [projects] = await pool.execute("SELECT * FROM Projects");

    res.render('projects-we-are-proud-of',{projects});

  } catch (error) {
    res.status(500).json({ message: "Server error in projectController", error });
  }
}

export const getOneProject = async (req,res)=>{
  try {
    const { id } = req.params; // Get project ID from URL

    // Fetch project details
    const [project] = await pool.execute("SELECT * FROM Projects WHERE id = ?", [id]);

    if (project.length === 0) {
      return res.status(404).json({ message: "Project not found!" });
    }

    // Fetch services linked to the project
    const [services] = await pool.execute(
      `SELECT s.id, s.name 
       FROM Services s
       JOIN ProjectServices ps ON s.id = ps.service_id
       WHERE ps.project_id = ?`,
      [id]
    );
    // res.status(200).json({ 
    //   message: "We found the project!", 
    //   sercvices: services,
    //   projects: project,
    // });
    res.render('project-address',{services,project});
  } catch (error) {
    res.status(500).json({ message: "Server error in projectController", error });
  }
}

export const create = async (req, res) => {
  try {
    const { title, address, info } = req.body;

    if (!title || !address || !info) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    let imageUrl = null;
    
    // Upload to Cloudinary if an image is provided
  
    if (req.file) {
      // Upload to Cloudinary if an image is provided
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: 'projects',
      });
      imageUrl = uploadResponse.secure_url;
    }
    
    // Insert new project into the database
    const [result] = await pool.execute(
      "INSERT INTO Projects (title, address, info, image_url) VALUES (?, ?, ?, ?)",
      [title, address, info,imageUrl||'default-image.jpg']
    );

    // Return success response with inserted project ID
    res.status(201).json({ 
      message: "Project added successfully!", 
      projectId: result.insertId 
    });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error in projectController", error });
  }
};


export const edit = async (req,res)=>{
  try {
      const projectId = req.params.id;
      const updates = req.body; // Get only the fields sent in the request

      // Check if project exists
      const [existingProject] = await pool.execute("SELECT * FROM Projects WHERE id = ?", [projectId]);
      if (existingProject.length === 0) {
        return res.status(404).json({ message: "Project not found!" });
      }

      // Dynamically build update query
      let query = "UPDATE Projects SET ";
      let values = [];
      Object.keys(updates).forEach((key, index) => {
        query += `${key} = ?${index < Object.keys(updates).length - 1 ? ", " : " "}`;
        values.push(updates[key]);
      });
      query += "WHERE id = ?";
      values.push(projectId);

      // Execute the update query
      await pool.execute(query, values);

      res.json({ message: `Project with ID ${projectId} updated successfully!`, updates });
  
  } catch (error) {
    res.status(500).json({ message: "Server error in projectController", error });
  }
}

export const destroy = async (req,res)=>{
  try {
    const projectId = req.params.id; // Get project ID from URL

    // Check if project exists
    const [existingProject] = await pool.execute("SELECT * FROM Projects WHERE id = ?", [projectId]);
    if (existingProject.length === 0) {
      return res.status(404).json({ message: "Project not found!" });
    }

    // Delete project from the database
    await pool.execute("DELETE FROM Projects WHERE id = ?", [projectId]);

    res.json({ message: `Project with ID ${projectId} deleted successfully!` });
  
  } catch (error) {
    res.status(500).json({ message: "Server error in projectController", error });
  }
}