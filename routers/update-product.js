const express = require("express");
const router = express.Router();
const { firestore } = require("../common/firebase");

router.put("/:rfidId", async (req, res) => {
  try {
    const { productName, productDescription, productImage } = req.body;
    const { rfidId } = req.params;

    const productData = await firestore.collection("product").doc(rfidId).get();
    if (!productData.data()) {
      res.status(400).json({
        message: `Product ${rfidId} not exist`,
      });
      return;
    }

    let prepareData = {};

    if (productName) {
      prepareData.productName = productName;
    }

    if (productDescription) {
      prepareData.productDescription = productDescription;
    }

    if (productImage) {
      prepareData.productImage = productImage;
    }

    await firestore.collection("product").doc(rfidId).update(prepareData);

    res.json({
        message: "Update product success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

exports.router = router;
