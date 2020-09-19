const db = require('../persistence');
const uuid = require('uuid/v4');

module.exports = async (req, res) => {

	const {temp, hum, rel} = req.params


    const item = {
        id: uuid(),
        time: +Date.now(),
       	temp: +temp,
       	hum: +hum,
       	rel: +rel
    };

    await db.storeItem(item);
    res.send(item);
};
