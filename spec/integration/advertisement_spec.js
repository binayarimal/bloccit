const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
 const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {
  beforeEach((done) => {
       this.advertisement;
       sequelize.sync({force: true}).then((res) => {

        Advertisement.create({
          title: "Advertisement",
          description: "They are annoying"
        })
         .then((advertisement) => {
           this.advertisement = advertisement;
           done();
         })
         .catch((err) => {
           console.log(err);
           done();
         });

       });

     });
  describe("GET /advertisements", () => {

    it("should return a status code 200 and all advertisements", (done) => {

 //#3
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Advertisement");
          expect(body).toContain("Advertisement");
          done();
        });
      });
    });
  describe("GET /advertisements/new", () => {

    it("should render a new ads form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Ads");
        done();
      });
    });

  });
  describe("POST /advertisements/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };

      it("should create a new ads and redirect", (done) => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Advertisement.findOne({where: {title: "blink-182 songs"}})
            .then((advertisement) => {
              expect(res.statusCode).toBe(303);
              expect(advertisement.title).toBe("blink-182 songs");
              expect(advertisement.description).toBe("What's your favorite blink-182 song?");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });
  describe("GET /advertisements/:id", () => {

     it("should render a view with the selected ad", (done) => {
       request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Advertisement");
         done();
       });
     });

   });
   describe("POST /advertisements/:id/destroy", () => {

     it("should delete the ad with the associated ID", (done) => {

 //#1
       Advertisement.all()
       .then((advertisements) => {

 //#2
         const advertisementCountBeforeDelete = advertisements.length;

         expect(advertisementCountBeforeDelete).toBe(1);

 //#3
         request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
           Advertisement.all()
           .then((advertisements) => {
             expect(err).toBeNull();
             expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1);
             done();
           })

         });
       });

     });

   });
   describe("GET /advertisements/:id/edit", () => {

     it("should render a view with an edit ad form", (done) => {
       request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Ad");
         expect(body).toContain("Advertisement");
         done();
       });
     });

   });
  });
