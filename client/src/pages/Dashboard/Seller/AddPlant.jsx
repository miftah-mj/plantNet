import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { uploadImage } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const AddPlant = () => {
    const { user } = useAuth();
    const [uploadButton, setUploadButton] = useState("Upload Image");
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = parseFloat(form.price.value);
        const quantity = parseInt(form.quantity.value);
        const image = form.image.files[0];
        const imageUrl = await uploadImage(image);

        // Seller Info
        const seller = {
            name: user.displayName,
            image: user.photoURL,
            email: user.email,
        };

        // Create plant object
        const plant = {
            name,
            description,
            category,
            price,
            quantity,
            image: imageUrl,
            seller,
        };
        console.table(plant);
    };

    return (
        <div>
            <Helmet>
                <title>Add Plant | Dashboard</title>
            </Helmet>

            {/* Form */}
            <AddPlantForm
                handleSubmit={handleSubmit}
                uploadButton={uploadButton}
                setUploadButton={setUploadButton}
            />
        </div>
    );
};

export default AddPlant;
