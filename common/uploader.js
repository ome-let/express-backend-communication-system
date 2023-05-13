const { storage } = require('./firebase');
const fs = require('fs');

const uploadFile = async (ref ,file) => {
    try {
        const fileRef = await fs.readFileSync(__dirname + "\\\\..\\\\" + file.path);
        const storageRef = storage.ref(ref + "/" + file.originalname);
        await storageRef.put(fileRef.buffer);
        fs.unlinkSync(__dirname + "\\\\..\\\\" + file.path);
        return Promise.resolve(storageRef.getDownloadURL());
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    uploadFile
}