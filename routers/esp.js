const express = require("express");
const router = express.Router();
const { firestore } = require("../common/firebase");

router.post("/", async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      res.status(400).json({
        message: "Request body is not correct",
      });
      return;
    }

    if (status != "IN_STOCK" && status != "OUT_STOCK") {
      res.status(400).json({
        message: "Status is not correct",
      });
      return;
    }

    const productData = await firestore.collection("product").doc(id).get();
    if (!productData.data()) {
      res.status(404).json({
        message: `Product ${id} not found`,
      });
      return;
    }

    let productQuatity = productData.data().productQuatity;

    if (status == "IN_STOCK") {
      productQuatity += 1;
    } else {
      productQuatity = productQuatity > 0 ? productQuatity - 1 : 0;
    }

    await firestore.collection("product").doc(id).update({
      productQuatity,
    });

    const dateTime = new Date().valueOf();
    const random = Math.floor(Math.random() * 1000);

    await firestore
      .collection("productHistory")
      .doc(`${id}_${dateTime}_${status}_${random}`)
      .set({
        productId: id,
        status: status,
        dateTime: dateTime,
      });

    res.json({
      message: "Quatity update success",
      product: productData.data()
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

exports.router = router;
