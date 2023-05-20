const { firestore } = require("./firebase");

const getProductById = async (id, cache=[]) => {
    try {
        if(cache.length > 0) {
            let product = cache.find((item) => item.id == id);
            if(product) {
                return Promise.resolve(product);
            }
        }
        let product = await firestore.collection("product").doc(id).get();
        return Promise.resolve({
            id: product.id,
            ...product.data()
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    getProductById
}
