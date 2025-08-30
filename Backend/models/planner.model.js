import mongoose from "mongoose";

// कृपया ध्यान दें: नीचे प्लानर (Planner) के लिए Mongoose मॉडल बनाया गया है जिसमें Task Title, Category, Start Date, End Date और Description शामिल हैं।

const plannerSchema = new mongoose.Schema(
  {
    taskTitle: { type: String, required: true }, // कार्य का शीर्षक
    category: { type: String, required: true },  // श्रेणी
    startDate: { type: Date, required: true },   // प्रारंभ तिथि
    endDate: { type: Date, required: true },     // समाप्ति तिथि
    description: { type: String },               // विवरण (Description)
  },
  { timestamps: true }
);

const Planner = mongoose.model("Planner", plannerSchema);

export default Planner;
export { plannerSchema, Planner };