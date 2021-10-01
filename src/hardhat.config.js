require("@nomiclabs/hardhat-waffle")
let secret =require("./secret.json")
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: secret.url,
      accounts: [secret.key]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}