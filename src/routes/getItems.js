const db = require('../persistence');

module.exports = async (req, res) => {
	const {start, end} = req.params
    const items = await db.getItems(start, end);
    res.send(items);
};
