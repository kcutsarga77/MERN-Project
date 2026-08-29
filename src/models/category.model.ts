// name, description, logo
import mongoose from "mongoose";


// interface
interface ICategoryDocument extends Document {
    name: string,
    description: string,
    image: string
}
//schema
const categorySchema = new mongoose.Schema<ICategoryDocument>(
    {
        name: {
            type: String,
            required: [true, "category name is required"],
            unique: [true, "category with given name already exists"],
            minLength: [3,"category name must be at least 3 charecters long"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "description is required"],
            trim: true
        },
        image: {
            type: String,
            required: [true, "image is required"]
        }
    },
    {timestamps: true}
);

// model
const Category = mongoose.model<ICategoryDocument>("category", categorySchema);
export default Category;