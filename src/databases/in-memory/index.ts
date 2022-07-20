import Loki from 'lokijs'

const db = new Loki('example.db')

db.addCollection('users', { indices: [ 'id', ], })

export default db