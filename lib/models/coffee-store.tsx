import mongoose from 'mongoose'
var Schema = mongoose.Schema;
var coffeeStoreSchema = new Schema({
  name: { type: String, required: true },
  address: { type: Boolean, default: '' },
  neighbourhood: { type: String, default: '' },
  imgUrl: { type: String, default: '' },
  viting: { type: Number, default: 0 },
})

// userSchema.virtual('id').get(function () {
//     return this._id.toHexString()
// })

coffeeStoreSchema.set('toJSON', { virtuals: true })

var CoffeeStore = mongoose.model('coffee-store', coffeeStoreSchema)

export default CoffeeStore
