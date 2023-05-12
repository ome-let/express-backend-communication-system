const express = require('express');
const router = express.Router();
const { firestore } = require('../common/firebase');

router.get('/', async (req, res) => {
    const datas = await firestore.collection('test');
    const dataList = [];

    const data = await datas.get(); 
    data.forEach(doc => {
        dataList.push({
            id: doc.id,
            ...doc.data()
        });
    });

    res.json(dataList);
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const data = await firestore.collection('test').doc(id).get();
    if(!data.data()) {
        res.status(404).json({
            message: 'Not found'
        })
        return;
    }
    res.json({
        id: data.id,
        ...data.data()
    });
})

router.post('/', async (req, res) => {
    const { name, age } = req.body;

    const data = await firestore.collection('test').add({
        name,
        age
    });

    res.json({
        id: data.id,
        name,
        age
    });
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    const data = await firestore.collection('test').doc(id).get();
    if(!data.data()) {
        res.status(404).json({
            message: 'Not found'
        })
        return;
    }

    let prepareData = {};
    if(name) {
        prepareData.name = name;
    }

    if(age) {
        prepareData.age = age;
    }

    await firestore.collection('test').doc(id).update(prepareData);

    res.json({
        id: id
    });
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const docRef = await firestore.collection('test').doc(id).get();

    if(!docRef.data()) {
        res.status(404).json({
            message: 'Not found'
        })
        return;
    }

    await firestore.collection('test').doc(id).delete();
    res.json({
        message: "Delete success"
    });
})

exports.router = router;
