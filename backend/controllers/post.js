const Post = require('../models/Post');
const fs = require('fs');
const { find } = require('../models/Post');
const User = require("../models/User");

exports.createPost = (req, res, next) => {
  User.findOne({_id :req.auth.userId})  
    .then((user) => {
      const postObject = req.file ? {
        message : req.body.message,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : 
      
        { ...req.body };
        let imagePort = "";
        if (postObject.imageUrl != undefined) {
        imagePort = postObject.imageUrl;
        }
        console.log("cette console", postObject);
        console.log("on est juste avant la création");
        const post = new Post ({
            ...postObject,
            email: user.email,
            userId: req.auth.userId,
            imageUrl: imagePort,
            likes: 0,
            usersLiked: [],
            createdOn: new Date().toISOString()
            //Date().getMilliseconds
        });
    
        post.save()
        .then(() => { res.status(201).json({message: 'Post enregistré'})})
        .catch(err => { res.status(400).json( { err } )})
    })

};

 exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyPost = (req, res, next) => { 
  const postObject = req.file ? {
        message : req.body.message,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject.userId;
    User.findOne({_id :req.auth.userId})  
    .then(user => {
      if (user.admin == "true"){
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
  User.findOne({_id :req.auth.userId})  
    .then(user => {
      console.log("user.admin =", user.admin);
      console.log("user =", user);
      if (user.admin == "true"){
        console.log("If");
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
        console.log("else");
        Post.findOne({ _id: req.params.id})
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({message: 'Non-autorisé'  })
            } else {
                const filename = post.imageUrl.split('/images/')[1];
                console.log(filename);
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() => {
                          res.status(200).json({message: 'objet supprimé'})})
                        .catch((error) => {
                          res.status(401).json({ error })});
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
      console.log("erreur");
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
      var myIndex = post.usersLiked.indexOf(userId);
      if (myIndex !== -1) {
        res.status(200).json({message : 'vous avez déjà like'})
      }
      else {
    post.usersLiked.push(userId);
    post.likes = post.usersLiked.length;
    post.save();
    res.status(200).json({message : 'like pris en compte'})
    }})
    .catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }
  if (like == 0) {
    Post.findOne({ _id: req.params.id})
    .then(post => {
      var myIndex = post.usersLiked.indexOf(userId);
      if (myIndex !== -1) {
        post.usersLiked.splice(myIndex, 1);
      }
      post.likes = post.usersLiked.length;
      post.save();
    res.status(200).json({message : 'like annulé'});
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
