const express = require('express');
const router = express.Router();

// Product Model
const Product = require('../models/products');

// @route GET /products/:id
// @desc Get product by ID
router.get('/:id', (req, res) => {
  // Fetch product from database by ID
  const query = { _id: req.params.id };
  Product.findOne(query)
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving product from database.' });
    });
});

// @route GET /products
// @desc Get ALL products
router.get('/', (req, res) => {
  // Fetch all products from database
  Product.find({})
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving products from database.' });
    });
});

// @route POST /products
// @desc Create a product
router.post('/', (req, res) => {
  console.log(req.body);
  // Create a product item
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  newProduct.save()
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error creating product in database.' });
    });
});

// @route PUT api/products/:id
// @desc Update a product
router.put('/:id', (req, res) => {
  // Update a product in the database
  Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true })
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updating product in database.' });
    });
});

module.exports = router;

// const express = require('express');
// const router = express.Router();

// // Product Model
// const Product = require('../models/products');

// // @route GET /products/:id
// // @desc Get product by ID
// router.get('/:id', (req, res) => {
// // Fetch product from database by ID
// const query = { _id: req.params.id };
// Product.findOne(query)
// .then(product => {
// res.json(product);
// })
// .catch(err => {
// console.log(err);
// res.status(500).json({ error: 'Error retrieving product from database.' });
// });
// });

// module.exports = router;
// // const express = require('express')
// // const router = express.Router();

// // // Product Model
// // const Product = require('../models/products');

// // // @route GET /products
// // // @desc Get ALL products
// // router.get('/', (req,res)=>{
// //    // Fetch all products from database
// //    Product.find({}, (error, product)=>{
// //        if (error) console.log(error)
// //        res.json(product)
// //    })
// // })
// // // @route POST /products
// // // @desc  Create a product
// // router.post('/', (req,res)=>{
// //     console.log(req.body)
// //     // Create a product item
// //     const newProduct = new Product({
// //         name: req.body.name,
// //         description: req.body.description,
// //         price: req.body.price,
// //         quantity: req.body.quantity,
// //     });
 
// //     newProduct.save((err, product)=>{
// //         if (err) console.log(err)
// //         res.json(product)
// //     })
// //  })
// //  // @route PUT api/products/:id
// // // @desc  Update a product
// // router.put('/:id', (req,res)=>{
// //     // Update a product in the database
// //     Product.updateOne({_id:req.params.id},{
// //         name: req.body.name,
// //         description: req.body.description,
// //         price: req.body.price,
// //         quantity: req.body.quantity,
// //     }, {upsert: true}, (err, product)=>{
// //         if(err) console.log(err);
// //         res.json(product)
// //     })
// //  })

// // module.exports = router;