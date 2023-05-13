const express = require("express");
const router = express.Router();
const { firestore } = require("../common/firebase");

router.get("/", async (req, res) => {
  try {
    let { page, limit, getAll } = req.query;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    let products = await firestore
      .collection("product")
      .orderBy("productName", "desc")
      .get();
    let data = [];

    if (getAll == "true") {
      limit = products.docs.length;
      page = 1;
    }

    for (let i = limit * (page - 1); i < limit * page; i++) {
      if (i >= products.docs.length) {
        break;
      }
      const product = products.docs[i];
      data.push({
        id: product.id,
        ...product.data(),
      });
    }

    res.json({
      page: Math.ceil(page),
      maxPage: Math.ceil(products.docs.length / limit),
      limit: Math.ceil(limit),
      allProducts: products.docs.length,
      products: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let product = await firestore
      .collection("product")
      .doc(id)
      .get();

    if(!product.data()){
        res.status(404).json({
            message: 'Not found'
        })
        return;
    }

    res.json({
        id: product.id,
        ...product.data()
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/search/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params;
    let { keys } = req.query;   

    if (!keys) {
      keys = "productName";
    }

    keys = keys.split(",");

    let products = await firestore
      .collection("product")
      .orderBy("productName", "desc")
      .get();
    let data = [];

    for (let i = 0; i < products.docs.length; i++) {
      const product = products.docs[i];
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        if (key == "id") {
          if (product.id.includes(keyword)) {
            data.push({
              id: product.id,
              ...product.data(),
            });
            break;
          }
          continue;
        }

        if (product.data()[key].toString().includes(keyword)) {
          data.push({
            id: product.id,
            ...product.data(),
          });
          break;
        }
      }
    }

    res.json({
      keyword: keyword,
      keys: keys,
      searchCount: data.length,
      allProducts: products.docs.length,
      products: data,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
})

exports.router = router;
