const Greeter = artifacts.require("Greeter");

async function main() {
  const greeter = await Greeter.new("Hello, Hardhat!");
  Greeter.setAsDeployed(greeter);

  console.log("Greeter deployed to:", greeter.address);

  const greeting = await greeter.greet();
  console.log("Current Greeting:", greeting);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
