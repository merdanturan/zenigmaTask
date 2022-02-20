import Dexie from 'dexie';

export const db = new Dexie('zenigma');
db.version(1).stores({
  users: '++user, email, password', 
  posts: '++post, header, content, createdAt, readBy, blogger'
});