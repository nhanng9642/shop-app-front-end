import {
  Button,
  Typography,
} from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { CategoryService, ProductService } from "@/services";
import { ImageInput, TextInput } from "@/components";

// eslint-disable-next-line react/prop-types
export function ProductForm({ productId }) {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    
    const updateImage = (file) => { 
        setImage(file);
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: product,
    });

    const onSubmit = async (data) => {
        data.bookImage = image;
        
        const { updateProduct, addProduct } = ProductService;
        const saveData = productId ? updateProduct : addProduct;
            
        setIsUpdate(true);
        toast.promise(
            saveData(data),
            {
                loading: 'Loading...',
                success: res => {
                    return res.message
                },
                error: res => res.message,
            }
        );
        setIsUpdate(false); 
    }

    //Fetch product if edit page
    useEffect(() => {
        const fetchProduct = async (productId) => {
            const data = await ProductService.getProduct(productId);
            if (!data)
                navigate("/page-not-found");

            data.categoryId = String(data.category.id);
            setProduct(data);
            reset(data);
        }

        if (productId) {
            fetchProduct(productId);
        }
    }, [navigate, productId, reset])

    //Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await CategoryService.getCategories();
            data.forEach((category) => {
                category.id = String(category.id);
                category.name = category.categoryName;
            })
            setCategories(data);
        }

        fetchCategories();
    }, [])

    return (
    <div>
        <Typography variant="h4">
            {productId ? "Edit Product" : "Add Product"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"
            className="mt-4 mb-2 mx-auto">
            <div className="grid grid-cols-5 md:grid-cols-5 gap-8">
                <div className="col-span-3">
                    <TextInput 
                        name="title"
                        label="Book Title"
                        register={register}
                        errors={errors}
                    />

                    <TextInput 
                        name="author"
                        label="Author"
                        register={register}
                        errors={errors}
                    />

                    {/* Category */}
                    <div className="mb-6 flex flex-col gap-6 mt-4">
                        <Typography variant="small" color="blue-gray"
                            className="-mb-3 font-medium">
                            Category
                        </Typography>

                        <select className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
                            defaultValue={product?.category?.id}
                            {...register('categoryId')}>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}
                                >
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <TextInput 
                        name="price"
                        label="Price"
                        number positive
                        register={register}
                        errors={errors}
                    />

                    <TextInput 
                        name="publisher" 
                        label="Publisher"
                        register={register}
                        errors={errors}
                    />

                    <TextInput
                        name="publishedYear"
                        label="Published Year"
                        register={register}
                        integer positive
                        errors={errors}
                    />

                    <TextInput
                        name="quantityAvailable"
                        label="Quantity"
                        integer positive
                        register={register}
                        errors={errors}
                    />

                    <TextInput
                        name="description"
                        label="Description"
                        register={register}
                        errors={errors}
                        isTextArea optional
                    />
                </div>

                <ImageInput product={product} updateImage={updateImage} />
            </div>

            <Button className="mt-6 w-1/5 ml-auto mr-6" fullWidth type="submit" disabled={isUpdate}>
                {productId ? "Update product" : "Add Product"}
            </Button>
        </form>

    </div>
    )
}
