const Post = require('../models/Post');
const fs = require('fs');
const { find } = require('../models/Post');

exports.createPost = (req, res, next) => {
  const postObject = req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
} : { ...req.body };

    delete postObject._id;
    delete postObject._userId;
    const imagePort = postObject.imageUrl;
    const post = new Post ({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: imagePort,
        likes: 0,
        usersLiked: [],
        createdOn: new Date().toISOString()
        //Date().getMilliseconds
    });

    post.save()
    .then(() => { res.status(201).json({message: 'Post enregistré'})})
    .catch(error => { res.status(400).json( { error } )})
};

/* exports.getOnePost = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}; */

exports.modifyPost = (req, res, next) => { 
  const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject.userId;
    user.findOne({_id :req.auth.userId})  
    .then(user => {
      if (user.admin){
        Post.findOne({ _id: req.params.id})
        .then(post => {
          if (postObject.imageUrl) {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Post modifié'}))
            .catch(error => res.status(401).json({ error }));  
            })
          } else {
            Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Post modifié'}))
            .catch(error => res.status(401).json({ error }));  
          }
        })
      }
      else {
      Post.findOne({_id: req.params.id})
        .then((post) => {
          if (post.userId != req.auth.userId) {
              res.status(401).json({ message : 'Non-autorisé' })
          } else {
            if (postObject.imageUrl) {
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
              Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Post modifié'}))
              .catch(error => res.status(401).json({ error }));  
              })
            } else {
              Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Post modifié'}))
              .catch(error => res.status(401).json({ error }));  
            }
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      })
}});
}









exports.deletePost = (req, res, next) => {
  user.findOne({_id :req.auth.userId})  
    .then(user => {
      if (user.admin){
        Post.findOne({ _id: req.params.id})
        .then(post => {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() => {res.status(200).json({message: 'objet supprimé'})})
                        .catch(error => res.status(401).json({ error }));
                })
        })
        .catch( error => {
            res.status(500).json({ error });
          })
      }
      else {
        Post.findOne({ _id: req.params.id})
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({message: 'Non-autorisé'  })
            } else {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() => {res.status(200).json({message: 'objet supprimé'})})
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        })
      }}
    )}





exports.getAllPost = (req, res, next) => {
  Post.find().then(
    (post) => {
      let ordrePost = post;
      ordrePost.sort((a, b) => {
        return b.createdOn - a.createdOn;
      })
      res.status(200).json(ordrePost);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};





exports.likeStatus = (req, res, next) => {
  const userId = req.auth.userId;
  const like = req.body.like;
  if (like == 1) {
    Post.findOne({ _id: req.params.id})
    .then(post => {
    post.usersLiked.push(userId);
    post.likes = post.usersLiked.length;
    post.save();
    res.status(200).json({message : 'like pris en compte'})
    })
    .catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }
}
