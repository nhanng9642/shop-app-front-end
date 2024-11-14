import {useState,useEffect} from "react";
import {
    Navbar,
    Typography,
    Badge,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {ShoppingCartIcon,MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {useNavigate,Link} from "react-router-dom";
import { ProductService } from "@/services";
import { useUserContext } from "@/context/user";
import { ProfileMenu } from "@/components";

export const HeaderUser = () => {
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');
    const [searchResult, setSearchResult] = useState([]);
	const {cart} = useUserContext();
    useEffect(() => {
		const fetchSearchProduct = async () => {
			if(searchString.length !== 0){
				const data = await ProductService.getProductsWithFilter(`search=${searchString}&limit=10`);
				setSearchResult(data.data);
			}
			else {
				setSearchResult([]);
			}
		};
		fetchSearchProduct();
    },[searchString]);
    return (
        <Navbar className="sticky top-0 z-10 bg-[#263238] bg-opacity-100 h-max max-w-full rounded-none border-none px-8 py-3">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to="/">
                    <Typography
						as="h5"
						className="mx-2 cursor-pointer text-2xl py-1.5 font-bold text-white tracking-wider grow"
                    >
                    HOME
                    </Typography>
                </Link>
                <div className="flex items-center justify-between flex-nowrap">
					<div className="mx-2">
						<Menu
							dismiss={{
								itemPress: false,
							}}
						>
							<MenuHandler>
								<IconButton className="text-white hover:text-blue-500 bg-transparent">
									<MagnifyingGlassIcon className="w-8 h-8"/>
								</IconButton>
							</MenuHandler>
							<MenuList>
								<Input
									label="Search"
									value={searchString}
									onChange={e => setSearchString(e.target.value)}
									containerProps={{
										className: "mb-4",
									}}
								/>
								{searchResult.map(item => (
								<MenuItem 
									key={`searchMenuItem-${item._id}`}
									onClick={() => {navigate(`product-views/${item._id}`)}}
									>
									<Link to={`product-views/${item._id}`}>
										{item.name}
									</Link>
								</MenuItem>
								))}
							</MenuList>
						</Menu>
					</div>
					<div className="mx-2">
						<Badge content={cart.length}>
							<Link to="cart">
								<IconButton className="text-white hover:text-blue-500 bg-transparent">
									<ShoppingCartIcon className="w-8 h-8"/>
								</IconButton>
							</Link>
						</Badge>
					</div>
					<div className="mx-2">
						<ProfileMenu/>
					</div>
                </div>
            </div>
        </Navbar>
    );
};