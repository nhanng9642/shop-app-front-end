import {
  Button,
  Typography,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { CategoryService } from "@/services";
import { TextInput } from "@/components";

// eslint-disable-next-line react/prop-types
export function CategoryForm({ categoryID }) {
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: category,
    });

    const onSubmit = async (data) => {
        const saveCategory = categoryID ? CategoryService.updateCategory
                                        : CategoryService.createCategory;
    
        setIsUpdating(true);
        toast.promise(
            saveCategory(data),
            {
                loading: 'Loading...',
                success: () => { 
                    navigate("/admin/category");
                    return "Category saved!";
                },
                error: error => "Error: " + error.message
            }
        );
        setIsUpdating(false);
    }

    useEffect(() => {
        const fetchProduct = async (id) => {
            const data = await CategoryService.getCategory(id);
            if (!data)
                navigate("/page-not-found");
            setCategory(data);
            reset({ ...data });
        }

        if (categoryID) {
            fetchProduct(categoryID);
        }
    }, [categoryID, navigate, reset])

    return (
        <div className='min-h-[400px]'>
        <Typography variant="h4">
            {categoryID ? "Edit Category" : "Add Category"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"
            className="mt-4 mb-2 mx-auto w-1/2">

            {categoryID && <TextInput 
                label="Category ID"
                name="id"
                disabled
                errors={errors}
                register={register}
            />}

            <TextInput 
                label="Category Name"
                autoFocus
                name="categoryName"
                errors={errors}
                register={register}
            />

            <TextInput 
                label="Description"
                name="description"
                errors={errors}
                register={register}
                isTextArea optional
            />

            <Button className="mt-6 w-fit ml-auto" fullWidth 
                type="submit" disabled={isUpdating}>
                {categoryID ? "Update Category" : "Add Category"}
            </Button>
        </form>

        </div>
    )
}
