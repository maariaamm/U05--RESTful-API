const mongoose = require('mongoose'); 


mongoose.connect('mongodb+srv://mariamsdatabase:mongodatabase@cluster0.hii8let.mongodb.net/cardb?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
}); 