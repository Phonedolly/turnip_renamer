const path = require('path')
const dotenv = require('dotenv')
const Post = require('./schemes/post')

dotenv.config({ path: path.join(__dirname, '.env') });

/* initialize mongoose */
const connect = require('./schemes');
connect();

Post.find({}).then((allPosts) => {
  let promises = [];
  console.log(allPosts[0].title + '\n\n' + allPosts[0].content)

  allPosts.forEach((eachPost, i) => {
    promises.push(
      Post.updateOne({ _id: eachPost._id }, {
        ...eachPost.toObject(),
        content: '# ' + allPosts[i].title + '\n\n' + allPosts[i].content
      })
    )
  })
  Promise.allSettled(promises)
    .then(result => {
      console.log(result);
    })
})
