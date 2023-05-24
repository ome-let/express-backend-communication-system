const express = require("express");
const router = express.Router();
const { firestore } = require('../common/firebase');
const logger = require("../common/logger");

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
        logger.notify("❌ Update product", `Product with rfid ${rfidId} not exist`);
        return;
    }

    let prepareData = {
        productName,
        productQuatity: 0,
        createdAt: new Date().valueOf(),
    }

    prepareData.productDescription = productDescription ? productDescription : "";
    prepareData.productImage = productImage ? productImage : "";

    await firestore.collection("product").doc(rfidId).set(prepareData);

    logger.notify("✅ Insert product", `Product \`${productName}\` with rfid \`${rfidId}\` is inserted`, 3066993)
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
