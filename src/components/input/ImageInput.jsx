/* eslint-disable react/prop-types */
import { useState } from "react";

const imageDefault = "https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg";

export function ImageInput({product, updateImage}) {
    const [fileName, setFileName] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const link = URL.createObjectURL(file);
            updateImage(file);
            setPreview(link);
            setFileName(file.name);
        }
    }
    
    return (
        <div className="col-span-2" >
            <label className="mb-2 mr-2 text-sm font-medium text-gray-900 border border-gray-300 
                    rounded-lg p-2 cursor-pointer w-fit hover:bg-gray-100 "
                    htmlFor="file_input">
                        Upload image
            </label>
            
            {<span className="mt-2">{fileName}</span>}
            
            <input className="block w-full text-sm text-gray-900 border 
                        border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden 
                        focus:outline-none" 
                    name="bookImage"
                    onChange={handleChangeImage}
                    id="file_input" 
                    type="file" />

            <img    src={preview || product?.bookImage || imageDefault} 
                    alt={product?.title || "Book Image"}
                    title={product?.title || "Book Image"}
                    className="w-4/5 mt-4" />
        </div>
    )
}
