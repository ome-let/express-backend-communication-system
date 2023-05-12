const express = require("express");
const router = express.Router();
const { firestore } = require('../common/firebase');

router.post("/", async (req, res) => {
  try {
    const { rfidId, productName, productDescription, productImage } = req.body;

    if (!rfidId || !productName) {
      res.status(400).json({
        message: "Request body is not correct",
      });
      return;
    }

    const productData = await firestore.collection("product").doc(rfidId).get();
    if (productData.data()) {
        res.status(400).json({
            message: `Product ${rfidId} already exist`,
        });
        return;
    }

    let prepareData = {
        productName,
        productQuatity: 0
    }

    prepareData.productDescription = productDescription ? productDescription : "";
    prepareData.productImage = productImage ? productImage : "";

    await firestore.collection("product").doc(rfidId).set(prepareData);

    res.json({
        message: "Insert product success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

exports.router = router;