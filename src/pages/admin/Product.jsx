import { Table} from '@/components'
import { ProductService } from '@/services';

export function Product() {
    const TABLE_HEAD = ["#", "Book", "Author", "Inventory", 
        "Price", "Genre", "Description", "Actions"];
    
    const properties = ["id", "title", "author", "quantityAvailable", 
        "price", "category.categoryName", "description"];

    const { getProducts, deleteProduct } = ProductService;
    return (
        <Table
            name="Product"
            tableHead={TABLE_HEAD}
            properties={properties}
            getData={getProducts}
            deleteData={deleteProduct}
        />
    )
}
