const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
describe("Topic", () => {

  beforeEach((done) => {
    //#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      //#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        //#3
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          //#4
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
  describe("#create()", () => {
    it("should create a topic object with a title,and description", (done) => {
      Topic.create({
        title: "Pros of Cryosleep during the long journey",
        description: "1. Not having to answer the 'are we there yet?' question.",

      })
      .then((topic) => {
        expect(topic.title).toBe("Pros of Cryosleep during the long journey");
        expect(topic.description).toBe("1. Not having to answer the 'are we there yet?' question.");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe("#getPost()", () => {

    it("should associate a topic and a post together", (done) => {

      Post.create({
        title: "Challenges of interstellar travel",
        body: "1. The Wi-Fi is terrible",
        topicId:this.topic.id
      })

      .then((newPost) => {
        expect(newPost.topicId).toBe(this.topic.id);
        newPost.setTopic(this.topic)
        .then((post) => {
          // #4
          expect(post.topicId).toBe(this.topic.id);
          this.topic.getPosts()
          .then((associatedPosts) => {
            expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b"
          );
          expect(associatedPosts[1].title).toBe("Challenges of interstellar travel")

          done();
        });
        done();

      });
    });

  });
});










})
