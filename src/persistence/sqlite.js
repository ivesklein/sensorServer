const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = './points.db'//process.env.SQLITE_DB_LOCATION || '/etc/todos/todo.db';

let db, dbAll, dbRun;

console.log('Loading DB')

function init() {
    const dirName = require('path').dirname(location);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }

    return new Promise((acc, rej) => {
        db = new sqlite3.Database(location, err => {
            if (err) return rej(err);

            if (process.env.NODE_ENV !== 'test')
                console.log(`Using sqlite database at ${location}`);

            db.run(
                'CREATE TABLE IF NOT EXISTS temp (id varchar(36), time BIGINT, temp REAL, hum REAL, rel REAL)',
                (err, result) => {
                    if (err) return rej(err);
                    acc();
                },
            );
        });
    });
}

async function teardown() {
    return new Promise((acc, rej) => {
        db.close(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getItems() {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM temp', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows
            );
        });
    });
}

/*async function getItem(id) {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM todo_items WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                )[0],
            );
        });
    });
}*/

async function storeItem(item) {
    return new Promise((acc, rej) => {
        db.run(
            'INSERT INTO temp (id, time, temp, hum, rel) VALUES (?, ?, ?, ?, ?)',
            [item.id, item.time, item.temp, item.hum, item.rel],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

/*async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        db.run(
            'UPDATE todo_items SET name=?, completed=? WHERE id = ?',
            [item.name, item.completed ? 1 : 0, id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
} 

async function removeItem(id) {
    return new Promise((acc, rej) => {
        db.run('DELETE FROM todo_items WHERE id = ?', [id], err => {
            if (err) return rej(err);
            acc();
        });
    });
}*/

module.exports = {
    init,
    teardown,
    getItems,
    //getItem,
    storeItem,
    //updateItem,
    //removeItem,
};
