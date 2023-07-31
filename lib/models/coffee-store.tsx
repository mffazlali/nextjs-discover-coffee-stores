import mongoose from 'mongoose'
const entityDBName='Coffeestore'
const coffeeStoreSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, default: '' },
  neighbourhood: { type: String, default: '' },
  imgUrl: { type: String, default: '' },
  voting: { type: Number, default: 0 },
})

// userSchema.virtual('id').get(function () {
//     return this._id.toHexString()
// })

coffeeStoreSchema.set('toJSON', { virtuals: true })


let CoffeeStore = mongoose.models.Coffeestore || mongoose.model(entityDBName, coffeeStoreSchema)


export default CoffeeStore
