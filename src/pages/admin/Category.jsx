import { Table } from '@/components'
import { CategoryService } from '@/services'

export function Category() {
    const tableHeader = ["#", "Name", "Description", "Action"];
    const properties = ["id", "categoryName", "description"];
    const {deleteCategory, getCategories} = CategoryService;
    return (
        <Table
            name="Category"
            tableHead={tableHeader}
            properties={properties}
            deleteData={deleteCategory}
            getData={getCategories}
        />
    )
}

