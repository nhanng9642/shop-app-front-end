import React, { useEffect, useState } from 'react'
import { ProductForm } from '../../components/ProductForm'


export default function EditProduct() {
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        const productId = window.location.pathname.split("/").pop();
        setProductId(productId);
    }, [])

    return (
        <ProductForm productId={productId} />
    )
}

export {EditProduct}