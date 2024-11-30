import { Table} from '@/components'
import { getProducts, deleteProduct } from '@/services';

export function Product() {
    const TABLE_HEAD = ["#", "Book", "Author", "Inventory", 
        "Price", "Genre", "Description", "Actions"];
    
    const properties = ["id", "title", "author", "quantityAvailable", 
        "price", "category.categoryName", "description"];

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
