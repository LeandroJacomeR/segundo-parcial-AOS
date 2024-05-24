export interface CategoryInterface {
    id: number,
    name: string,
    image: string
}

export interface ProductoInterface {
    id: number,
    title: string,
    price: number,
    description: string,
    images: string[],
    category: CategoryInterface
}
