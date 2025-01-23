import Product from '../../model/product/productModel';
import fetch from 'node-fetch';

//Fetch all products
export const getGeneralProducts = async (req: any, res: any) =>  {
    try {
        const products = await Product.find();
      
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getAllProducts = async (req: any, res: any) =>  {
  try {
      const products = await Product.find();
     
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
  }
};



//Add a product
export const addProduct = async (req: any, res: any) => {
  try {
    const { name, brand, price, image_link, category } = req.body;
    const newProduct = new Product({ name, brand, price, image_link, category });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};


  // Update a product
export const updateProduct = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update product' });
    }
  };
  
  // Delete a product
  export const deleteProduct = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete product' });
    }
  };


  export async function populateFromAPI(req: any, res: any) {
    try {
      const response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json");
      if(!response.ok) {
        throw new Error(`Failed to fetch products from public API. Status: ${response.status}`);
      }
      const publicApiProducts = await response.json();
      const products = publicApiProducts.map((product: any) => {
        return{
          category: product.category,
          brand: product.brand,
          name: product.name,
          image_link: product.image_link,
          price: product.price,
        }
      })
     
      const savedProducts = await Product.insertMany(products);
      res.status(201).send({products,savedProducts}); 
    } catch (error) {
      console.error('Error populating products from public API:', error);
      res.status(500).json({ error: 'Failed to populate products from public API' });
    }
  }

