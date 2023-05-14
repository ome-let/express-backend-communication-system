const express = require("express");
const router = express.Router();
const { firestore } = require("../common/firebase");
const { getProductById } = require("../common/product");

router.get("/", async (req, res) => {
  try {
    let { filterBy, page, limit, getAll } = req.query;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    if(!filterBy) {
      filterBy = "dateTime";
    }

    let productHistoryList = await firestore
      .collection("productHistory")
      .get();

    let data = [];
    let productCache = [];

    if (getAll == "true") {
      limit = productHistoryList.docs.length;
      page = 1;
    }

    for (let i = 0; i < productHistoryList.docs.length; i++) {
      const productHistory = productHistoryList.docs[i];
      let product = await getProductById(productHistory.data().productId, productCache);
      productCache.push(product);
      data.push({
        id: productHistory.id,
        ...productHistory.data(),
        product: product
      });
    }

    // filter data
    if(filterBy == "dateTime") {
      data.sort((a, b) => {
        return new Date(b.dateTime) - new Date(a.dateTime);
      });
    } else if(filterBy == "productName") {
      data.sort((a, b) => {
        return a.product.productName.localeCompare(b.product.productName);
      });
    } else if(filterBy == "productId") {
      data.sort((a, b) => {
        return a.productId.localeCompare(b.productId);
      })
    }

    // pagination
    let start = limit * (page - 1);
    let end = limit * page;
    if(end > data.length) {
      end = data.length;
    }
    data = data.slice(start, end);

    res.json({
      page: Math.ceil(page),
      maxPage: Math.ceil(productHistoryList.docs.length / limit),
      limit: Math.ceil(limit),
      filterBy: filterBy,
      allHistory: productHistoryList.docs.length,
      productHistory: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

exports.router = router;
