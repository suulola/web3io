const { ethers } = require('hardhat')

const main = async () => {
  const nftContract = await ethers.getContractFactory('NFTee')
  const deployedNFTContract = await nftContract.deploy()

  console.log('deployedNFTContract', deployedNFTContract.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
