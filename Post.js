const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Add more fields for posts (e.g., likes, comments, etc.)
  });
  
  module.exports = mongoose.model('Post', postSchema);