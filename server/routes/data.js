const bcrypt=require('bcryptjs');
const data = {
  users: [
    {
        name: 'ilyas',
        email: 'ilyas@gmail.com',
        password: bcrypt.hashSync('Ilyas.99', 8),
        isAdmin: true,
    }],
    products: [
     
      {
        name: 'Adidas Fit Pant',
        category: 'Pants',
        image: 'img/hp.png',
        price: 139,
        brand: 'Adidas',
        countInStock: 20,
        rating: 4.5,
        numReviews: 15,
        description: 'high quality product',
      },
    ],
  };
module.exports=data;