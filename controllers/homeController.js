
export const index = (req,res)=>{
  try {
    res.render("home-services")
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const termsIndex = (req,res)=>{
  try {
    res.render("terms-conditions")
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

