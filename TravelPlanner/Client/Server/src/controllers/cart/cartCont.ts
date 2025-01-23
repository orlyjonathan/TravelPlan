import Cart from '../../model/cart/carts';
import Product from '../../model/product/productModel';

// Add item to cart
export const addToCart = async (req:any, res: any) => {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);

    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        quantity,
        price: product.price,
        image: product.image,
      });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};
// const calculateTotalPrice = async (items) => {
//   const productDetails = await Promise.all(
//     items.map(async (item) => {
//       const product = await Product.findById(item.productId);
//       return product ? product.price * item.quantity : 0;
//     })
//   );

//   return productDetails.reduce((acc, price) => acc + price, 0);
// };
// Get cart by userId
export const getCart = async (req: any, res: any) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred'});
  }
};

// Delete item from cart
export const deleteFromCart = async (req: any, res: any) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);

    if (itemIndex >= 0) {
      cart.items.splice(itemIndex, 1);
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};

// Update item quantity in cart
export const updateCart = async (req: any, res: any) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      // Recalculate total price
      cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};
