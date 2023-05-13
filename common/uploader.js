const { storage } = require('./firebase');
const fs = require('fs');

const uploadFile = async (ref ,file) => {
    try {
        let filePath = ""
        if(process.env.environment == "local") {
            filePath = __dirname + "\\\\..\\\\" + file.path;
        } else {
            filePath = file.path;
        }
        const fileRef = await fs.readFileSync(filePath);
        const storageRef = storage.ref(ref + "/" + file.originalname);
        await storageRef.put(fileRef.buffer);
        fs.unlinkSync(filePath);
        return Promise.resolve(storageRef.getDownloadURL());
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    uploadFile
}