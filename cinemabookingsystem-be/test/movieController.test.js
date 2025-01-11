import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";
import { app } from "../index.js";
import Movie from "../models/Movie-model.js";

describe("Movie Controller", function () {
  let request;
  let token;
  let id;

  before(() => {
    request = supertest(app);
  });

  before(async () => {
    const response = await request.post("/admin/login").send({
      email: "admin1@gmail.com",
      password: "12345",
    });
    token = response.body.token;
    id = response.body.id;
    // console.log({ token, response });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("GET /movie", function () {
    it("should return status 200 and all movies", async function () {
      const fakeMovies = [
        { title: "Movie 1", description: "Description 1" },
        { title: "Movie 2", description: "Description 2" },
      ];

      sinon.stub(Movie, "find").returns(Promise.resolve(fakeMovies));

      const response = await request
        .get("/movie")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body.movies.length).to.equal(2);
    });
  });

  describe("GET /movie/:id", function () {
    it("should return status 200 and movie data", async function () {
      const fakeMovie = { title: "Movie 1", description: "Description 1" };
      sinon.stub(Movie, "findById").returns(Promise.resolve(fakeMovie));

      const response = await request
        .get("/movie/123")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body.movie.title).to.equal("Movie 1");
    });
  });
});
