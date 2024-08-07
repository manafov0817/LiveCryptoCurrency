export class CryptoHistoryOptions {
  chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 4,

    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: `Price `,
        },
      },
    },
  };
  coins = [
    { label: 'Bitcoin', value: 'bitcoin' },
    { label: 'Ethereum', value: 'ethereum' },
    { label: 'Cardano', value: 'cardano' },
    { label: 'Avalanche', value: 'avalanche-2' },
    { label: 'Dogecoin', value: 'dogecoin' },
    { label: 'BNB', value: 'binancecoin' },
    { label: 'Solana', value: 'solana' },
    { label: 'Polkadot', value: 'polkadot' },
    { label: 'Ripple', value: 'ripple' },
    { label: 'Litecoin', value: 'litecoin' },
    { label: 'Chainlink', value: 'chainlink' },
    { label: 'Stellar', value: 'stellar' },
    { label: 'Polygon', value: 'matic-network' },
    { label: 'VeChain', value: 'vechain' },
    { label: 'Tron', value: 'tron' },
    { label: 'Tezos', value: 'tezos' },
    { label: 'Cosmos', value: 'cosmos' },
    { label: 'Monero', value: 'monero' },
    { label: 'EOS', value: 'eos' },
    { label: 'IOTA', value: 'iota' },
    { label: 'NEO', value: 'neo' },
    { label: 'Dash', value: 'dash' },
    { label: 'Zcash', value: 'zcash' },
  ];

  currencies = [
    { label: 'USD', value: 'usd' },
    { label: 'EUR', value: 'eur' },
    { label: 'GBP', value: 'gbp' },
    { label: 'JPY', value: 'jpy' },
    { label: 'AUD', value: 'aud' },
    { label: 'CAD', value: 'cad' },
    { label: 'CHF', value: 'chf' },
    { label: 'CNY', value: 'cny' },
    { label: 'HKD', value: 'hkd' },
    { label: 'NZD', value: 'nzd' },
    { label: 'SGD', value: 'sgd' },
    { label: 'SEK', value: 'sek' },
    { label: 'NOK', value: 'nok' },
    { label: 'MXN', value: 'mxn' },
    { label: 'INR', value: 'inr' },
    { label: 'RUB', value: 'rub' },
    { label: 'ZAR', value: 'zar' },
    { label: 'TRY', value: 'try' },
    { label: 'BRL', value: 'brl' },
    { label: 'TWD', value: 'twd' },
  ];
}
