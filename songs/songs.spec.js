const Songs = require("./songs-models");
const db = require("../db/db-config");


  beforeEach(async () => {
    await db("songs").truncate();
  });
describe("The Songs model", () => {



it("list of songs" , async () => {
    const res = await Songs.find()
    expect(res).toHaveLength(0)
})
it("list of songs" , async () => {
    const data = {title:"hello", song_by:"adele"}
    const res = await Songs.add(data)
    expect(res.title).toBe("hello")
})
});
