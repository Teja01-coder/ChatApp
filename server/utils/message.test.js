let expect = require('expect');

var {generateMessage,generatelocationMessage} =require('./message');

describe('Generate Message', ()=>{
it("should generate correct message object",()=>{

  let from = "sai",
  text="some random text"
  message=generateMessage(from,text);

  expect(typeof message.createdAt).toBe('number');
  expect(message).toMatchObject({from, text});
})

})

describe("Generate Location Message ", function(){
  it("should generate correct location object", function(){
    let from = "teja",
    lat=15,
    lng=11,
    url=`https://www.google.com/maps?q=${lat},${lng}`
    message= generatelocationMessage(from,lat,lng);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,url});
  })
});
