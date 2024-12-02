import { useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { getProduct, getProductsWithFilter } from "@/services";

export const ProductView = () => {
	const {id} = useParams();
	const [product, setProduct] = useState({bookImage: ''});
	const [similarProducts, setSimilarProducts] = useState([]);
	
    useEffect(() => {
		const fetchData = async () => {
			const { data: product} = await getProduct(id);
			setProduct(product);
			
			const {data: similarProducts} = await 
                getProductsWithFilter(`category.id:${product.category.id}`, 5)	
			setSimilarProducts(similarProducts);
		}
        fetchData();
	}, [id]);
	
	return (
		<div className="relative flex flex-wrap md:flex-nowrap justify-center bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[100%] flex-row p-8">
			<div className="relative w-1/5 min-w-[300px] m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
				<img
				src={product.bookImage}
				alt="card-image" className="object-contain w-full h-full" />
			</div>
			<div className="p-6 grow">
				<h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
					{product.title}
				</h4>
				<p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
					Author: {product.author}
				</p>
				<p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
					Description: {product.description}
				</p>
				<p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
					Inventory: {product.quantityAvailable}
				</p>
				<p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
					Inventory: <b>{product.price}</b>
				</p>
				<p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
					Publishing Year: <b>{product.publishedYear}</b>
				</p>
				<p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
					Similar product:	
				</p>
				
                <div className="mb-8 grid grid-cols-5 gap-4">
					{similarProducts.map(book => (
						<Link key={`similarItem-${book.id}`} to={`/user/product-views/${book.id}`}>
							<div className="flex flex-col justify-center cursor-pointer">
								<img
									src={book.bookImage}
									className="object-contain object-center object-contain h-20 rounded-lg cursor-pointer" alt="gallery-image" />
								<Typography className="text-xs text-center">{book.title || "N / A"}</Typography>
							</div>
						</Link>
					))}
				</div>

				<Link to="/user">
					<button
						className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
						type="button">
						Continue shopping
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
							strokeWidth="2" className="w-4 h-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
						</svg>
					</button>
				</Link>
			</div>
		</div>  
	);
};