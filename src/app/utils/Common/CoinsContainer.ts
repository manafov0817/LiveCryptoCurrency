export class CoinsContainer {
  coins = [
    {
      label: 'bitcoin',
      name: 'Bitcoin',
      shortName: 'btc',
      imageLink: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=033',
    },
    {
      label: 'ethereum',
      name: 'Ethereum',
      shortName: 'eth',
      imageLink: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      label: 'cardano',
      name: 'Cardano',
      shortName: 'ada',
      imageLink: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    },
    {
      label: 'avalanche-2',
      name: 'Avalanche',
      shortName: 'avax',
      imageLink: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    },
    {
      label: 'dogecoin',
      name: 'Dogecoin',
      shortName: 'doge',
      imageLink: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    },
    {
      label: 'binancecoin',
      name: 'BNB',
      shortName: 'bnb',
      imageLink: 'https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=033',
    },
    {
      label: 'solana',
      name: 'Solana',
      shortName: 'sol',
      imageLink: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    },
    {
      label: 'apecoin',
      name: 'ApeCoin',
      shortName: 'ape',
      imageLink: 'https://cryptologos.cc/logos/apecoin-ape-ape-logo.png?v=033',
    },
    {
      label: 'polkadot',
      name: 'Polkadot',
      shortName: 'dot',
      imageLink: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=033',
    },
    {
      label: 'ripple',
      name: 'Ripple',
      shortName: 'xrp',
      imageLink: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=033',
    },
    {
      label: 'litecoin',
      name: 'Litecoin',
      shortName: 'ltc',
      imageLink: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
    },
    {
      label: 'chainlink',
      name: 'Chainlink',
      shortName: 'link',
      imageLink: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    },
    {
      label: 'stellar',
      name: 'Stellar',
      shortName: 'xlm',
      imageLink: 'https://cryptologos.cc/logos/stellar-xlm-logo.png',
    },
    {
      label: 'matic-network',
      name: 'Polygon',
      shortName: 'matic',
      imageLink: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    },
    {
      label: 'vechain',
      name: 'VeChain',
      shortName: 'vet',
      imageLink: 'https://cryptologos.cc/logos/vechain-vet-logo.png',
    },
    {
      label: 'tron',
      name: 'Tron',
      shortName: 'trx',
      imageLink: 'https://cryptologos.cc/logos/tron-trx-logo.png',
    },
    {
      label: 'tezos',
      name: 'Tezos',
      shortName: 'xtz',
      imageLink: 'https://cryptologos.cc/logos/tezos-xtz-logo.png',
    },
    {
      label: 'cosmos',
      name: 'Cosmos',
      shortName: 'atom',
      imageLink: 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
    },
    {
      label: 'monero',
      name: 'Monero',
      shortName: 'xmr',
      imageLink: 'https://cryptologos.cc/logos/monero-xmr-logo.png',
    },
    {
      label: 'eos',
      name: 'EOS',
      shortName: 'eos',
      imageLink: 'https://cryptologos.cc/logos/eos-eos-logo.png',
    },
    {
      label: 'iota',
      name: 'IOTA',
      shortName: 'miota',
      imageLink: 'https://cryptologos.cc/logos/iota-miota-logo.png',
    },
    {
      label: 'neo',
      name: 'NEO',
      shortName: 'neo',
      imageLink: 'https://cryptologos.cc/logos/neo-neo-logo.png',
    },
    {
      label: 'dash',
      name: 'Dash',
      shortName: 'dash',
      imageLink: 'https://cryptologos.cc/logos/dash-dash-logo.png',
    },
    {
      label: 'zcash',
      name: 'Zcash',
      shortName: 'zec',
      imageLink: 'https://cryptologos.cc/logos/zcash-zec-logo.png',
    },
  ];

  getCoinByLabel(label: string) {
    return this.coins.filter((coin) => coin.label == label)[0];
  }
  getCoinByShorName(shortName: string) {
    return this.coins.filter((coin) => coin.shortName == shortName)[0];
  }
}
