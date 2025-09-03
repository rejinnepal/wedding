const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://rejinnepal815_db_user:gHzdLtPH9aSMaKvM@cluster0.pwkwrs9.mongodb.net/wedding-website';

console.log('Testing MongoDB connection...');
console.log('URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  console.log('Database:', mongoose.connection.db.databaseName);
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:');
  console.error('Error:', err.message);
  console.error('Code:', err.code);
  process.exit(1);
});
