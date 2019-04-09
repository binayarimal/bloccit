const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Comment = require("../../src/db/models").Comment;
const User = require("../../src/db/models").User;
const Vote = require("../../src/db/models").Vote;
const request = require("request");
const baseURL = "http://localhost:3000"

describe("Vote", () => {

  beforeEach((done) => {
    // #2
    this.user;
    this.topic;
    this.post;
    this.vote;

    // #3
    sequelize.sync({force: true}).then((res) => {

      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((res) => {
        this.user = res;

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((res) => {
          this.topic = res;
          this.post = this.topic.posts[0];

          Comment.create({
            body: "ay caramba!!!!!",
            userId: this.user.id,
            postId: this.post.id
          })
          .then((res) => {
            this.comment = res;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("#create()", () => {

    // #2
    it("should create an upvote on a post for a user", (done) => {

      // #3
      Vote.create({
        value: 1,
        postId: this.post.id,
        userId: this.user.id
      })
      .then((vote) => {

        // #4
        expect(vote.value).toBe(1);
        expect(vote.postId).toBe(this.post.id);
        expect(vote.userId).toBe(this.user.id);
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it("should not create an upvote on a post for a user with a val other than 1", (done) => {

      // #3
      Vote.create({
        value: 2,
        postId: this.post.id,
        userId: this.user.id
      })
      .then((vote) => {

        // #4

        expect(vote.value).toBeNull();
        expect(vote.postId).not.toBe(this.post.id);
        expect(vote.userId).not.toBe(this.user.id);
        done();

      })
      .catch((err) => {
        expect(err).not.toBe(null)
        done();
      });
    });
    it("should not create a vote twice on the same post", (done) => {
      Vote.create({
        value: 1,
        postId:this.post.id ,
        userId:this.user.id,

      })
      .then((vote) => {

        request.get(`${baseURL}${this.topic.id}/posts/${this.post.id}/votes/upvote`)
        .then((err,res,body) =>{
          expect(err).toBeNull();
          Vote.findAll({postId:this.post.id,userId:this.user.id})
          .then((votes)=> {
            expect(votes.length).toBe(1);
            expect(votes[0].value).toBe(1);
            done();
          })
        })

      })
      .catch((err) => {

        expect(err).not.toBe(null);

        done();

      })
    });


    it("should create a downvote on a post for a user", (done) => {
      Vote.create({
        value: -1,
        postId: this.post.id,
        userId: this.user.id
      })
      .then((vote) => {
        expect(vote.value).toBe(-1);
        expect(vote.postId).toBe(this.post.id);
        expect(vote.userId).toBe(this.user.id);
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    // #6









  })



  describe("#setUser()", () => {

    it("should associate a vote and a user together", (done) => {

      Vote.create({           // create a vote on behalf of this.user
        value: -1,
        postId: this.post.id,
        userId: this.user.id
      })
      .then((vote) => {
        this.vote = vote;     // store it
        expect(vote.userId).toBe(this.user.id); //confirm it was created for this.user

        User.create({                 // create a new user
          email: "bob@example.com",
          password: "password"
        })
        .then((newUser) => {

          this.vote.setUser(newUser)  // change the vote's user reference for newUser
          .then((vote) => {

            expect(vote.userId).toBe(newUser.id); //confirm it was updated
            done();

          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      })
    });

  });

  // #2
  describe("#getUser()", () => {

    it("should return the associated user", (done) => {
      Vote.create({
        value: 1,
        userId: this.user.id,
        postId: this.post.id
      })
      .then((vote) => {
        vote.getUser()
        .then((user) => {
          expect(user.id).toBe(this.user.id); // ensure the right user is returned
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

});
