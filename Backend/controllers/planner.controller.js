import Planner from "../models/planner.model.js";

// Controller to create a planner
export const createPlanner = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "Please login first." });
    }

    const { taskTitle, category, startDate, endDate, description } = req.body;

    // Check for required fields
    if (!taskTitle || !category || !startDate || !endDate) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Create new planner
    const planner = new Planner({
      taskTitle,
      category,
      startDate,
      endDate,
      description,
    });

    await planner.save();

    return res.status(201).json({ message: "Planner created successfully.", planner });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
};


// नोट: यह कोड बैकएंड कंट्रोलर का है, लेकिन "sending planner in the frontend" का मतलब है कि आपको एक ऐसा API endpoint बनाना है जिससे फ्रंटएंड प्लानर भेज सके। 
// ऊपर createPlanner पहले से मौजूद है, जो फ्रंटएंड से प्लानर रिसीव करता है। 
// अगर आपको एक और उदाहरण चाहिए, तो नीचे एक getPlanner (सभी प्लानर लाने के लिए) का उदाहरण दिया गया है, जिससे फ्रंटएंड प्लानर देख सके:

// सभी प्लानर लाने के लिए कंट्रोलर
export const getPlanners = async (req, res) => {
  try {
    // सिर्फ लॉगिन यूज़र के प्लानर लाओ (अगर userId है तो)
    const planners = await Planner.find({ /* userId: req.user._id */ });
    return res.status(200).json({ planners });
  } catch (error) {
    return res.status(500).json({ message: "कुछ गलत हो गया।", error: error.message });
  }
};

