export interface ProductEntity {
	id: number;
	title: string;
	description: string;
	img: string;
	price: string;
	seller: string;
	slug: string;
	size: string;
	brand: string;
	sold: boolean;
	liked: boolean;
}

export type Products = Array<ProductEntity>;

export interface ProductsState {
	products: Products;
}

export interface AddProductsAction {
	type: 'ADD_PRODUCTS';
	payload: ProductEntity[];
}

export interface ToggleProductAction {
	type: 'TOGGLE_PRODUCT_LIKED';
	id: number;
}

export type ProductActionTypes = AddProductsAction | ToggleProductAction;
