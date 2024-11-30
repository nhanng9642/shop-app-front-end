import { useEffect, useState, memo } from "react";
import { Typography } from "@material-tailwind/react";

import banner from '/img/Bookshop.gif';
import { getCategories, getLowerStockProducts, getProductsWithFilter} from "@/services";
import { ProductCart, CircularPagination } from "@/components";

const filterPrices = [
	{name:'All', value:''},
	{name:'Under 50.000', value:'price[lt]=50000'},
	{name:'From 50.000 - 100.000', value:'price[gte]=50000&price[lte]=100000'},
	{name:'From 100.000 - 200.000', value:'price[gte]=100000&price[lte]=200000'},
	{name:'From 200.000 - 500.000', value:'price[gte]=200000&price[lte]=500000'},
	{name:'Over 500.000', value:'price[gt]=500000'},
]

const filterCategories = [{name: 'All', value:''}];
const filterSortPrice = [
	{name: 'Ascending', value: 'sort=price'},
	{name: 'Descending', value: 'sort=-price'},
];
const limitProduct = 8;

// eslint-disable-next-line react/display-name
export const Home = memo(() => {
	const [, setCategories] = useState([]);
	const [books, setBooks] = useState([]);
	const [topLowerStock, setTopLowerStock] = useState([]);
	const [categoryQuery, setCategoryQuery] = useState(filterCategories[0].value);
	const [priceQuery, setPriceQuery] = useState(filterPrices[0].value);
	const [sortPriceQuery, setSortPriceQuery] = useState(filterSortPrice[0].value);
    
	const [currentPage,setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState();

	useEffect(() => {
		const fetchCategories = async () => {
			const { data: categories} = await getCategories();

			categories.forEach(item => {
				filterCategories.push({
					name: item.name,
					value: `categoryID=${item.id}`
				})
			})
			setCategories(categories);
		}

		const fetchTopLowerStock = async() => {
			const { data: products} = await getLowerStockProducts(4);
			setTopLowerStock(products);
		}

		fetchCategories();
		fetchTopLowerStock();	
	},[]);

	useEffect(() => {
		const fetchProduct = async () => {
			const {data: products, pagination} = await getProductsWithFilter(`${categoryQuery}&${priceQuery}&${sortPriceQuery}&page=${currentPage}&limit=${limitProduct}`);
			setBooks(products);
			setTotalPage(pagination.totalPages);
		}
		fetchProduct();
	}, [categoryQuery, priceQuery, sortPriceQuery, currentPage]);

	return (
		<main className="flex-grow-1 overflow-hidden">
			<div className="flex flex-col justify-center items-center bg-white">
				<img className="w-[100%] max-w-[480px]" src={banner}/>
				<div className="flex justify-center items-center flex-col max-w-[600px]">
					<Typography variant="h2"
						className="text-center text-3xl md:text-6xl font-bold mb-2"
					>
						Discover Your Next Favorite Book Here.
					</Typography>	
					<Typography variant="h6"
						className="text-center text-sm md:text-2xl mb-4 text-[#455A64] font p"
					>
						Explore our curated collection of new and popular books to find your next literary adventure.
					</Typography>
				</div>
			</div>
			
			<div className="flex flex-col justify-center items-center bg-[#263238] p-[40px]">
				<Typography className="text-white text-2xl md:text-4xl font-bold mb-[40px]">
					Almost <span className="text-red-900">Sold Out</span>	
				</Typography>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
					{topLowerStock.map(item => (
						<ProductCart
							key={`topLowerStock-${item.id}`}
							book={item}
						/>
					))}
				</div>
			</div>
			
			<div className="flex flex-col justify-center items-center">
				<Typography className="text-2xl md:text-4xl font-bold mt-[40px]">
					Discover <span className="text-red-900">Books</span>	
				</Typography>
				<Typography className="text-sm md:text-2xl text-[#455A64]">
					Explore our comprehensive collection of books.
				</Typography>
				<div className="flex flex-row flex-wrap justify-center items-center my-3">
					<div className="relative h-10 w-72 min-w-[120px] mb-2 mx-2">
						<select
							onChange={(e) => {setCategoryQuery(e.target.value);setCurrentPage(1)}} id="selectFilterCategory"
							className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
							{filterCategories.map((item, i) => (
								<option key={`filterCategoryItem-${i}`} value={item.value}>{item.name}</option>
							))}

						</select>
						<label
							className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Select category
						</label>
					</div>
					<div className="relative h-10 w-72 min-w-[120px] mb-2 mx-2">
						<select id="selectFilterPrice"
							onChange={(e) => {setPriceQuery(e.target.value); setCurrentPage(1)}}
							className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
							{filterPrices.map((item, i) => (
								<option key={`filterPriceItem-${i}`} value={item.value}>{item.name}</option>
							))}
						</select>
						<label
							className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Select price
						</label>
					</div>
					<div className="relative h-10 w-72 min-w-[120px] mb-2 mx-2">
						<select id="selectFilterSortPrice"
							onChange={(e) => {setSortPriceQuery(e.target.value)}}
							className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
							{filterSortPrice.map((item, i) => (
								<option key={`filterSortPriceItem-${i}`} value={item.value}>{item.name}</option>
							))}
						</select>
						<label
							className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Sort
						</label>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
					{books.map(item => (
						<ProductCart
							key={`productItem-${item.id}`}
							book={item}
						/>
					))}
				</div>
				<CircularPagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage}/> 
			</div>
		</main>
	);
});