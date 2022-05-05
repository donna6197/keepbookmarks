import request from "supertest"
import app from "./server"

//add one of my bookmark routes
describe("POST /users", () => {

  describe("when passed a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({ 
        username: "username", 
        password: "password" 
      })
      expect(response.statusCode).toBe(200)
    })
  })

})
