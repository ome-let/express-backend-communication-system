const express = require("express");
const router = express.Router();
const { firestore } = require("../common/firebase");

router.delete("/:rfidId", async (req, res) => {
  try {
    const { rfidId } = req.params;
    const productData = await firestore.collection("product").doc(rfidId).get();

    if (!productData.data()) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    await firestore.collection("test").doc(rfidId).delete();
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
