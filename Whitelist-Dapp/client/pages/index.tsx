import Web3Modal from 'web3modal'
import { providers, Contract } from 'ethers'
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Feedback from '../components/Feedback'
import { WHITELIST_ABI, WHITELIST_CONTRACT_ADDRESS } from '../utils/config'
import { IError } from '../interface/IGeneral'

const Home: NextPage = () => {
  const [trackers, setTrackers] = useState({
    walletConnected: false,
    joinedWhitelist: false
  })
  const [numOfWhitelisted, setNumOfWhitelisted] = useState(0)
  const [loadingAndError, setLoadingAndError] = useState<IError>({
    type: 'loading',
    value: ''
  })

  const web3ModalRef: any = useRef()

  const getProviderOrSignal = async (needSigner: boolean = false) => {
    try {
      const provider = await web3ModalRef?.current?.connect()
      const web3Provider = new providers.Web3Provider(provider)
      const { chainId } = await web3Provider.getNetwork()
      if (chainId !== 4) {
        setLoadingAndError(prevState => ({
          ...prevState,
          value: `Change the network to Rinkeby`,
          type: 'error'
        }))
        return
      }
      if (needSigner) {
        const signer = await web3Provider.getSigner()
        return signer
      }
      return web3Provider
    } catch (error) {
      console.log({ error }, 2)
    }
  }

  const addAddressToWhitelist = async () => {
    try {
      const signer = await getProviderOrSignal(true)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        WHITELIST_ABI,
        signer
      )
      setLoadingAndError(prev => ({ ...prev, type: 'loading' }))
      const update = await whitelistContract.addAddressToWhitelist()
      await update.wait()
      await getNumberOfWhitelisted()
      setLoadingAndError(prev => ({ value: '', type: 'error' }))
      setTrackers(prev => ({ ...prev, joinedWhitelist: true }))
    } catch (error) {
      console.log({ error }, 3)
    }
  }

  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSignal(false)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        WHITELIST_ABI,
        provider
      )
      const _numOfWhitelisted = await whitelistContract.numOfWhitelistedAddresses()
      setNumOfWhitelisted(_numOfWhitelisted)
    } catch (error) {
      console.log({ error }, 4)
    }
  }

  const checkIfAddressIsWhitelisted = async (): Promise<boolean> => {
    try {
      const provider = await getProviderOrSignal(false)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        WHITELIST_ABI,
        provider
      )
      console.log({ whitelistContract })
      const address = await whitelistContract.getCurrentUserAddress()
      const isWhitelisted = await whitelistContract.whitelistedAddresses(
        address
      )
      setTrackers(prev => ({ ...prev, joinedWhitelist: isWhitelisted }))
      return true
    } catch (error) {
      console.log({ error }, 5)
      return false
    }
  }

  const connectWallet = async () => {
    try {
      await getProviderOrSignal(false)
      const confirm = await checkIfAddressIsWhitelisted()

      setLoadingAndError(prev => ({
        ...prev,
        type: 'error',
        value: confirm === false ? `Failed to connect to Network` : ``
      }))
      if (confirm === false) return

      await getNumberOfWhitelisted()
      setTrackers(prev => ({ ...prev, walletConnected: true }))
    } catch (error) {
      console.log({ error }, 1)
    }
  }

  useEffect(() => {
    if (trackers.walletConnected !== true) {
      web3ModalRef.current = new Web3Modal({
        network: 'rinkeby',
        providerOptions: {},
        disableInjectedProvider: false
      })
      connectWallet()
    }
  }, [trackers.walletConnected])

  return (
    <main>
      <Header />
      <Feedback
        errorMessage={loadingAndError.value}
        type={loadingAndError.type}
      />
      <div className={`flex p-5 border`}>
        <div className={`flex-1 flex flex-col justify-center space-y-5`}>
          <h1 className={`font-serif font-bold text-4xl`}>
            Welcome to Crypto Devs!
          </h1>
          <p className={`font-mono`}>
            It's an NFT Collection for developers in Crypto
          </p>
          <p className={`font-mono`}>{numOfWhitelisted} have already joined</p>
          <div>
            {trackers.joinedWhitelist ? (
              <p>Thanks for joining</p>
            ) : (
              <button
                onClick={addAddressToWhitelist}
                className={`bg-blue-900 py-2 px-4 w-auto text-white rounded-lg`}
              >
                {loadingAndError.type === 'loading'
                  ? `Loading...`
                  : `Join the Whitelist`}
              </button>
            )}
          </div>
        </div>
        <div className={`flex-1`}>
          <img src={'/eth.png'} className={`object-contain`} />
        </div>
      </div>
    </main>
  )
}

export default Home
