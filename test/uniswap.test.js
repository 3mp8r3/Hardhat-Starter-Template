const IUniswapV2Router = artifacts.require("IUniswapV2Router");
const IERC20 = artifacts.require("IERC20");

const UNI_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const hre = require("hardhat");
const { expectEvent, time } = require("@openzeppelin/test-helpers");

const ACCOUNT = "0x0Adc81a8371c6719CdF3d20995ef1a0C2Bd4AB03";

// Traditional Truffle test
contract("Router", () => {
  let uniRouter;

  before(async function () {
    uniRouter = await IUniswapV2Router.at(UNI_ROUTER);

    // Unlock account in forked mainnet
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [ACCOUNT],
    });
  });

  it("Should swap ETH for DAI", async function () {
    const timestamp = await time.latest();
    const tx = await uniRouter.swapETHForExactTokens(
      web3.utils.toWei("100"),
      [WETH_ADDRESS, DAI_ADDRESS],
      ACCOUNT,
      timestamp + 3600,
      { from: ACCOUNT, value: web3.utils.toWei("0.1") }
    );
    console.log("Gas Used:", tx.receipt.gasUsed);

    const daiToken = await IERC20.at(DAI_ADDRESS);
    const balance = await daiToken.balanceOf(ACCOUNT);
    console.log("Dai Balance:", Number(web3.utils.fromWei(balance)));
  });
});
