const Greeter = artifacts.require("Greeter");

// Traditional Truffle test
contract("Greeter", ([admin, alice, bob, random]) => {
  it("Should return the new greeting once it's changed", async function () {
    const greeter = await Greeter.new("Hello!");
    assert.equal(await greeter.greet(), "Hello!");

    await greeter.setGreeting("Hello, World!", { from: admin });

    assert.equal(await greeter.greet(), "Hello, World!");
  });
});
