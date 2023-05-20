const express = require("express");
const router = express.Router();
const { firestore } = require("../common/firebase");
const logger = require("../common/logger");

router.delete("/:rfidId", async (req, res) => {
  try {
    const { rfidId } = req.params;
    const productData = await firestore.collection("product").doc(rfidId).get();

    if (!productData.data()) {
      res.status(404).json({
        message: "Not found",
      });
      logger.notify("Delete product", `Product ${rfidId} not exist`);
      return;
    }
    await firestore.collection("product").doc(rfidId).delete();
    logger.notify("Delete product", `Product ${productData.data().productName}(${rfidId}) is deleted`);
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

exports.router = router;
