var util = require('util');
var ee = require('events');

var db_data = [{
        id: 1,
        name: 'Artem E.V.',
        bday: '2003-01-22'
    },
    {
        id: 2,
        name: 'Lagunovski M.B.',
        bday: '2003-01-10'
    },
    {
        id: 3,
        name: 'Sergeev E.G.',
        bday: '2003-04-26'
    },
]

function DB() {
    this.get = () => {
        return db_data;
    };
    this.post = r => {
        console.log(db_data.findIndex(item => item.id == r.id));
        if (db_data.findIndex(item => item.id == r.id)>-1) {
            console.log("Invalid index");
        } else db_data.push(r);
    };
    this.put = r => {
        let indexOfObj = db_data.findIndex(item => item.id == r.id);
        if (indexOfObj >= 0) {
            return db_data.splice(indexOfObj, 1, r);
        } else {
            console.log("Invalid index");
            return db_data;
        }
    };
    this.delete = r => {
        let indexOfObj = db_data.findIndex(item => item.id == r);
        let data = db_data[indexOfObj];
        if (indexOfObj >= 0) {
            db_data.splice(indexOfObj, 1);
            console.log(indexOfObj);
        } else console.log("Invalid index");
        return data;
    };
}

util.inherits(DB, ee.EventEmitter);
exports.DB = DB;