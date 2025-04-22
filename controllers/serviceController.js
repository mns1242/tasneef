
export const index = (req,res)=>{
  try {
    res.render("home-services")
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const buildingManagementIndex = (req,res)=>{
  try {
    res.render("building-management")
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const carWashIndex = (req,res)=>{
  try {
    res.render("car-washing")
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

