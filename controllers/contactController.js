
export const index = (req,res)=>{
  try {
    res.render("contact-us")
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

