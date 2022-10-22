const events = require('events');

class DB extends events.EventEmitter {
    users = [{
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
    ];

    select() {
        return Promise.resolve(this.users);
    }

    insert(user) {
        if (this.users.find(u => u.id === user.id)) {
            console.log('User already exists');
            return Promise.reject('User already exists');
        }
        this.users.push(user);
        return Promise.resolve(user);
    }

    update(user) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
            return Promise.resolve(user);
        }
        else {
            console.log('User not found');
            return Promise.reject('User not found');
        }
    }

    delete(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            const deletedUser = this.users.splice(index, 1);
            return Promise.resolve(deletedUser);
        }
        else {
            console.log('User not found');
            return Promise.reject('User not found');
        }
    }
}

module.exports = new DB();