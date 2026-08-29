// name, description, logo
import mongoose from "mongoose";


// interface
interface IBrandDocument extends Document {
    name: string,
    description: string,
    logo: string
}
//schema

const brandSchema = new mongoose.Schema<IBrandDocument>(
    {
        name: {
            type: String,
            required: [true, "brand name is required"],
            unique: [true, "brand with given name already exists"],
            minLength: [3,"brand name must be at least 3 charecters long"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "description is required"],
            trim: true
        },
        logo: {
            type: String,
            required: [true, "logo is required"]
        }
    },
    {timestamps: true}
);

// model
const Brand = mongoose.model<IBrandDocument>("category", brandSchema);
export default Brand;