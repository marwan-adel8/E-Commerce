import axios from "axios";

export const ProductsData = async () => {
    const Products =await axios.get("https://fakestoreapi.com/products")
    return Products;
};

