// migrations/migrate-image-field.js
const mongoose = require('mongoose');
const Listing = require('../models/listing');

async function migrate() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  await Listing.updateMany(
    { Image: { $exists: true } },
    [
      { $set: { 'image.url': '$Image' } },
      { $unset: 'Image' }
    ]
  );
  console.log('✅ Migration complete: Image → image.url');
  process.exit();
}

migrate();
