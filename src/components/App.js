import React, { useEffect,useState } from 'react'
import './App.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import uniswapLogo from '../troll.png'
import wscrtLogo from '../wscrt-logo.png'
import runeLogo from '../rune-logo.png'
import linkLogo from '../Link.png'
import btcLogo from '../btc.png'
import rsrLogo from '../rsr.png'
import gasLogo from '../gas.png'
import siennaLogo from '../sienna.png'
import scrtusdtLogo from '../scrtusdt.png'
import btcethLogo from '../btceth.png'
import oceanLogo from '../ocean.png'
import manaLogo from '../mana.png'
import uniLogo from '../uni.png'
import yfiLogo from '../yfi.png'




//Graph setup Start ------------------------------------------------------
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})


const tokenQuery = gql`
query tokens($tokenAddress: Bytes!) {
  tokens(where: { id: $tokenAddress }) {
    derivedETH
    totalLiquidity
  }
}
`

const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`
//Graph setup end ------------------------------------------------------




//Testing with USDT to make object for easier iteration ------------------------------------------------------

var usdt_obj = {
  secret: "secret1gyct75dc2pf20vtj3l86k2jxg79mffyh9ljve3",
  uni: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  pool1_decimal : 1000000,
  pool2_decimal : 1000000,
  inv: 1,
  uni_eth: -1,
  uni_usdt: -1,
  uni_scrt: -1,
  ss_eth: -1,
  ss_usdt: -1,
  ss_scrt: -1,
  pool1: -1,
  pool2: -1,
  ss_query : -1,
  ratio : -1,
  diff : -1,
  diff_percent : -1
};

//End USDT setup ------------------------------------------------------



//RUNE setup ------------------------------------------------------

var rune_obj = {
  secret: "secret1j8vs8v729vregluuzr5n4zr77ztaleqtqcw026",
  uni: "0x3155ba85d5f96b2d030a4966af206230e46849cb",
  pool1_decimal : 1000000,
  pool2_decimal : 1000000000000000000,
  inv: 1,
  uni_eth: -1,
  uni_usdt: -1,
  uni_scrt: -1,
  ss_eth: -1,
  ss_usdt: -1,
  ss_scrt: -1,
  pool1: -1,
  pool2: -1,
  ss_query : -1,
  ratio : -1,
  diff : -1,
  diff_percent : -1
};

//End rune setup ------------------------------------------------------




//OCEAN setup ------------------------------------------------------

var ocean_obj = {
  secret: "secret13ns5mzms67jttq5cnv76j5lgtd0xf69sv4sdpq",
  uni: "0x967da4048cd07ab37855c090aaf366e4ce1b9f48",
  pool1_decimal : 1000000,
  pool2_decimal : 1000000000000000000,
  inv: 1,
  uni_eth: -1,
  uni_usdt: -1,
  uni_scrt: -1,
  ss_eth: -1,
  ss_usdt: -1,
  ss_scrt: -1,
  pool1: -1,
  pool2: -1,
  ss_query : -1,
  ratio : -1,
  diff : -1,
  diff_percent : -1
};

//End ocean setup ------------------------------------------------------



//MANA setup ------------------------------------------------------

var mana_obj = {
  secret: "secret1u9zfyh7d4mgf44f3y8fhz4e70dhjzd5e5df8hp",
  uni: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
  pool1_decimal : 1000000,
  pool2_decimal : 1000000000000000000,
  inv: 1,
  uni_eth: -1,
  uni_usdt: -1,
  uni_scrt: -1,
  ss_eth: -1,
  ss_usdt: -1,
  ss_scrt: -1,
  pool1: -1,
  pool2: -1,
  ss_query : -1,
  ratio : -1,
  diff : -1,
  diff_percent : -1
};

//End mana setup ------------------------------------------------------


//UNI setup ------------------------------------------------------

var uni_obj = {
  secret: "secret1pmt7ncuhau2g7h9snygx2tlkzqnks3uz5edgyc",
  uni: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
  pool1_decimal : 1000000,
  pool2_decimal : 1000000000000000000,
  inv: 1,
  uni_eth: -1,
  uni_usdt: -1,
  uni_scrt: -1,
  ss_eth: -1,
  ss_usdt: -1,
  ss_scrt: -1,
  pool1: -1,
  pool2: -1,
  ss_query : -1,
  ratio : -1,
  diff : -1,
  diff_percent : -1
};

//End uni setup ------------------------------------------------------


//YFI setup ------------------------------------------------------

var yfi_obj = {
  secret: "secret1zra95h6nf4kc49x59x66t7crxxl79hr5nph882",
  uni: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
  pool1_decimal : 1000000,
  pool2_decimal : 1000000000000000000,
  inv: 1,
  uni_eth: -1,
  uni_usdt: -1,
  uni_scrt: -1,
  ss_eth: -1,
  ss_usdt: -1,
  ss_scrt: -1,
  pool1: -1,
  pool2: -1,
  ss_query : -1,
  ratio : -1,
  diff : -1,
  diff_percent : -1
};

//End yfi setup ------------------------------------------------------







//Graph Uniswap token setup ------------------------------------------------------

function App() {
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY, {
    pollInterval: 45000
  })
  const { loading: wscrtLoading, data: wscrtData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: '0x2b89bf8ba858cd2fcee1fada378d5cd6936968be'
    },
    pollInterval: 45000
  })
  const { loading: runeLoading, data: runeData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: rune_obj.uni
    },
    pollInterval: 45000
  })
  const { loading: oceanLoading, data: oceanData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: ocean_obj.uni
    },
    pollInterval: 45000
  })
  const { loading: manaLoading, data: manaData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: mana_obj.uni
    },
    pollInterval: 45000
  })
  const { loading: uniLoading, data: uniData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: uni_obj.uni
    },
    pollInterval: 45000
  })
  const { loading: yfiLoading, data: yfiData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: yfi_obj.uni
    },
    pollInterval: 45000
  })
  const { loading: linkLoading, data: linkData } = useQuery(tokenQuery, {
  variables: {
    tokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca'
  },
  pollInterval: 45000
  })
  const { loading: wbtcLoading, data: wbtcData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
    },
    pollInterval: 45000
  })
  const { loading: rsrLoading, data: rsrData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: '0x8762db106b2c2a0bccb3a80d1ed41273552616e8'
    },
    pollInterval: 45000
  })
  const { loading: siennaLoading, data: siennaData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: '0x9b00e6e8d787b13756eb919786c9745054db64f9'
    },
    pollInterval: 45000
  })
  const { loading: usdtLoading, data: usdtData } = useQuery(tokenQuery, {
    variables: {
      tokenAddress: usdt_obj.uni
    },
    pollInterval: 45000
  })
  
  
 
  const wscrtPriceInEth = wscrtData && wscrtData.tokens[0].derivedETH
  const linkPriceInEth = linkData && linkData.tokens[0].derivedETH
  const wbtcPriceInEth = wbtcData && wbtcData.tokens[0].derivedETH
  const rsrPriceInEth = rsrData && rsrData.tokens[0].derivedETH
  const siennaPriceInEth = siennaData && siennaData.tokens[0].derivedETH
 
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice
  var link_wscrt = linkPriceInEth / wscrtPriceInEth
  var wbtc_wscrt = wbtcPriceInEth / wscrtPriceInEth
  var rsr_wscrt = rsrPriceInEth / wscrtPriceInEth
  var sienna_wscrt = siennaPriceInEth / wscrtPriceInEth
  
  
  
  
 

//Graph Uniswap End   Todo add USDT price for each  / should these be stored in an object / array on each? ------------------------------------------------------



//Secret JS / SecretSwap start ------------------------------------------------------



// DECLARE MY STATE VARIABLES

const [SSCRT_SETH, setSSCRT_SETH] = useState(-1)
const [SEDIF, setSEDIF] = useState(-1)


const [SRUNE_SETH, setSRUNE_SETH] = useState(-1)
const [RUNEDIF, setRUNEDIF] = useState(-1)


const [SLINK_SETH, setSLINK_SETH] = useState(-1)
const [LINKDIF, setLINKDIF] = useState(-1)

const [SWBTC_SETH, setSWBTC_SETH] = useState(-1)
const [WBTCDIF, setWBTCDIF] = useState(-1)


const [SWBTC_SETH_2, setSWBTC_SETH_2] = useState(-1)
const [WBTCDIF_2, setWBTCDIF_2] = useState(-1)


const [SRSR_SETH, setSRSR_SETH] = useState(-1)
const [RSRDIF, setRSRDIF] = useState(-1)

const [SSIENNA_SETH, setSSIENNA_SETH] = useState(-1)
const [SIENNADIF, setSIENNADIF] = useState(-1)

const [SUSDT_SETH, setSUSDT_SETH] = useState(-1)
const [USDTDIF, setUSDTDIF] = useState(-1)


const [SOCEAN_SETH, setSOCEAN_SETH] = useState(-1)
const [OCEANDIF, setOCEANDIF] = useState(-1)

const [mana_eth, set_mana_eth] = useState(-1)
const [mana_dif, set_mana_dif] = useState(-1)

const [uni_eth, set_uni_eth] = useState(-1)
const [uni_dif, set_uni_dif] = useState(-1)

const [yfi_eth, set_yfi_eth] = useState(-1)
const [yfi_dif, set_yfi_dif] = useState(-1)




const { CosmWasmClient } = require('secretjs');
//47c6970a118c040e08681d806bfb9580
//4eab0aefd483de629bf4b3e620bd0b93

const SECRET_REST_URL='https://secret-2--lcd--full.datahub.figment.io/apikey/4eab0aefd483de629bf4b3e620bd0b93/'

const main = async () => {
  // Create connection to DataHub Secret Network node
  const client = new CosmWasmClient(SECRET_REST_URL)

  // Query Pair Price SCRT
  const price = await client.queryContractSmart(
    'secret14zv2fdsfwqzxqt7s2ushp4c4jr56ysyld5zcdf',
    { pool: {} }
  )


var pool1 = price.assets[0].amount
var pool2 = price.assets[1].amount


pool1 = pool1/1000000
pool2 = pool2/1000000000000000000

var diff = pool1/pool2

var ratioinv = pool2/pool1

setSSCRT_SETH(ratioinv)
var sedif = 0
if (wscrtPriceInEth < ratioinv){
  sedif = ((ratioinv - wscrtPriceInEth)/wscrtPriceInEth)*100
  console.log(sedif)
  
}else{
  sedif = ((wscrtPriceInEth - ratioinv)/ratioinv)*100
  console.log(sedif) 
}

setSEDIF(sedif)


 //console.log('sSCRT per sETH:', ratio)
 //console.log('sETH per sSCRT:', ratioinv)
 






// Query Pair Price LINK
const price_link = await client.queryContractSmart(
  'secret1x8244a7l2fr642axef0sl5z3jw2pn75rp36hxs',
  { pool: {} }
)


var pool5 = price_link.assets[0].amount
var pool6 = price_link.assets[1].amount


pool5 = pool5/1000000
pool6 = pool6/1000000000000000000

var ratio3 = pool5/pool6
var ratioinv3 = pool6/pool5


// Query Pair Price WBTC
const price_wbtc = await client.queryContractSmart(
  'secret10x0k62eaal4q3t9c200qvmgftahxjqvdawn69c',
  { pool: {} }
)


var pool7 = price_wbtc.assets[0].amount
var pool8 = price_wbtc.assets[1].amount


pool7 = pool7/1000000
pool8 = pool8/100000000

var ratio5 = pool7/pool8
var ratioinv5 = pool8/pool7



// Query Pair Price WBTC ETH PAIR
const price_wbtc2 = await client.queryContractSmart(
  'secret1k2u3khzp59mp6wz2q4ulwhhy4rqpez63ln2fy6',
  { pool: {} }
)


var pool9 = price_wbtc2.assets[0].amount
var pool10 = price_wbtc2.assets[1].amount


pool9 = pool9/100000000
pool10 = pool10/1000000000000000000

var ratio9 = pool9/pool10
var ratioinv9 = pool10/pool9






// Query Pair Price RSR
const price_rsr = await client.queryContractSmart(
  'secret1g97kxc857asparfgdudzkzyq5akd74xmup52uj',
  { pool: {} }
)


var pool_rsr_1 = price_rsr.assets[0].amount
var pool_rsr_2 = price_rsr.assets[1].amount


pool_rsr_1 = pool_rsr_1/1000000
pool_rsr_2 = pool_rsr_2/1000000000000000000

var ratio_rsr = pool_rsr_1/pool_rsr_2
var ratio_rsr_inv = pool_rsr_2/pool_rsr_1



// Query Pair Price Sienna
const price_sienna = await client.queryContractSmart(
  'secret1rxrg8mp4qm5703ccz26lgh8hx7gpnkujrn6qcr',
  { pool: {} }
)


var pool_sienna_1 = price_sienna.assets[0].amount
var pool_sienna_2 = price_sienna.assets[1].amount


pool_sienna_1 = pool_sienna_1/1000000
pool_sienna_2 = pool_sienna_2/1000000000000000000

var ratio_sienna = pool_sienna_1/pool_sienna_2
var ratio_sienna_inv = pool_sienna_2/pool_sienna_1









console.log('******************************************')
console.log('LINK INFO')
console.log('Uniswap LINK / WSCRT', link_wscrt)
console.log('SecretSwap sLINK / sSCRT', ratio3)

var diff3 = ratio3 - link_wscrt
var diff3_percent = (diff3 / link_wscrt)*100
console.log('Difference', diff3)
console.log('Difference ', parseFloat(diff3_percent).toFixed(2), '%')



setSLINK_SETH(ratio3)


var linkdif = 0
if (link_wscrt < ratio3){
  linkdif = ((ratio3 - link_wscrt)/link_wscrt)*100 
}else{
  linkdif = ((link_wscrt - ratio3)/ratio3)*100
}

setLINKDIF(linkdif)




console.log('******************************************')
console.log('WBTC INFO')
console.log('Uniswap WBTC / WSCRT', wbtc_wscrt)
console.log('SecretSwap WBTC / sSCRT', ratio5)

var diff5 = ratio5 - wbtc_wscrt
var diff5_percent = (diff5 / wbtc_wscrt)*100
console.log('Difference', diff5)
console.log('Difference ', parseFloat(diff5_percent).toFixed(2), '%')



setSWBTC_SETH(ratio5)


var wbtcdif = 0
if (wbtc_wscrt < ratio5){
  wbtcdif = ((ratio5 - wbtc_wscrt)/wbtc_wscrt)*100 
}else{
  wbtcdif = ((wbtc_wscrt - ratio5)/ratio5)*100
}

setWBTCDIF(wbtcdif)




console.log('******************************************')
console.log('WBTCETH INFO')
console.log('Uniswap WBTC / ETH', wbtcPriceInEth)
console.log('SecretSwap WBTC / ETH', ratioinv9)

var diff9 = ratioinv9 - wbtcPriceInEth
var diff9_percent = (diff9 / wbtcPriceInEth)*100
console.log('Difference', diff9)
console.log('Difference ', parseFloat(diff9_percent).toFixed(2), '%')



setSWBTC_SETH_2(ratioinv9)


var wbtcdif = 0
if (wbtcPriceInEth < ratioinv9){
  wbtcdif = ((ratioinv9 - wbtcPriceInEth)/wbtcPriceInEth)*100 
}else{
  wbtcdif = ((wbtcPriceInEth - ratioinv9)/ratioinv9)*100
}

setWBTCDIF_2(wbtcdif)





console.log('******************************************')
console.log('RSR INFO')
console.log('Uniswap RSR / WSCRT', rsr_wscrt)
console.log('SecretSwap SRSR / sSCRT', ratio_rsr)

var diff_rsr = ratio_rsr - rsr_wscrt
var diff_rsr_percent = (diff_rsr / rsr_wscrt)*100
console.log('Difference', diff_rsr)
console.log('Difference ', parseFloat(diff_rsr_percent).toFixed(2), '%')



setSRSR_SETH(ratio_rsr)


var rsrdif = 0
if (rsr_wscrt < ratio_rsr){
  rsrdif = ((ratio_rsr - rsr_wscrt)/rsr_wscrt)*100 
}else{
  rsrdif = ((rsr_wscrt - ratio_rsr)/ratio_rsr)*100
}

setRSRDIF(rsrdif)



console.log('******************************************')
console.log('SIENNA INFO')
console.log('Uniswap SIENNA / WSCRT', sienna_wscrt)
console.log('SecretSwap SSIENNA / sSCRT', ratio_sienna)

var diff_sienna = ratio_sienna - sienna_wscrt
var diff_sienna_percent = (diff_sienna / sienna_wscrt)*100
console.log('Difference', diff_sienna)
console.log('Difference ', parseFloat(diff_sienna_percent).toFixed(2), '%')



setSSIENNA_SETH(ratio_sienna)


var siennadif = 0
if (sienna_wscrt < ratio_sienna){
  siennadif = ((ratio_sienna - sienna_wscrt)/sienna_wscrt)*100 
}else{
  siennadif = ((sienna_wscrt - ratio_sienna)/ratio_sienna)*100
}

setSIENNADIF(siennadif)
















// Query Pair Price USDT  Start --------------------------------------

usdt_obj.uni_eth = usdtData && usdtData.tokens[0].derivedETH
usdt_obj.uni_scrt =  wscrtPriceInEth / usdt_obj.uni_eth 

usdt_obj.ss_query = await client.queryContractSmart(
  usdt_obj.secret,
  { pool: {} }
)

usdt_obj.pool1 = usdt_obj.ss_query.assets[0].amount / usdt_obj.pool1_decimal
usdt_obj.pool2 = usdt_obj.ss_query.assets[1].amount / usdt_obj.pool2_decimal

if (usdt_obj.inv == 1){
  usdt_obj.ss_scrt = usdt_obj.pool2/usdt_obj.pool1
}else {
  usdt_obj.ss_scrt = usdt_obj.pool1/usdt_obj.pool2
}

setSUSDT_SETH(usdt_obj.ss_scrt)


if (usdt_obj.uni_scrt < usdt_obj.ss_scrt){
  usdt_obj.diff = ((usdt_obj.ss_scrt - usdt_obj.uni_scrt)/usdt_obj.uni_scrt)*100 
}else{
  usdt_obj.diff = ((usdt_obj.uni_scrt - usdt_obj.ss_scrt)/usdt_obj.ss_scrt)*100
}

setUSDTDIF(usdt_obj.diff)

// Query Pair Price USDT  End --------------------------------------




// Query Pair Price RUNE  Start --------------------------------------

rune_obj.uni_eth = runeData && runeData.tokens[0].derivedETH
rune_obj.uni_scrt =  wscrtPriceInEth / rune_obj.uni_eth 

rune_obj.ss_query = await client.queryContractSmart(
  rune_obj.secret,
  { pool: {} }
)

rune_obj.pool1 = rune_obj.ss_query.assets[0].amount / rune_obj.pool1_decimal
rune_obj.pool2 = rune_obj.ss_query.assets[1].amount / rune_obj.pool2_decimal

if (rune_obj.inv == 1){
  rune_obj.ss_scrt = rune_obj.pool2/rune_obj.pool1
}else {
  rune_obj.ss_scrt = rune_obj.pool1/rune_obj.pool2
}

setSRUNE_SETH(rune_obj.ss_scrt)


if (rune_obj.uni_scrt < rune_obj.ss_scrt){
  rune_obj.diff = ((rune_obj.ss_scrt - rune_obj.uni_scrt)/rune_obj.uni_scrt)*100 
}else{
  rune_obj.diff = ((rune_obj.uni_scrt - rune_obj.ss_scrt)/rune_obj.ss_scrt)*100
}

setRUNEDIF(rune_obj.diff)

// Query Pair Price RUNE  End --------------------------------------


// Query Pair Price ocean  Start --------------------------------------

ocean_obj.uni_eth = oceanData && oceanData.tokens[0].derivedETH
ocean_obj.uni_scrt =  wscrtPriceInEth / ocean_obj.uni_eth 

ocean_obj.ss_query = await client.queryContractSmart(
  ocean_obj.secret,
  { pool: {} }
)

ocean_obj.pool1 = ocean_obj.ss_query.assets[0].amount / ocean_obj.pool1_decimal
ocean_obj.pool2 = ocean_obj.ss_query.assets[1].amount / ocean_obj.pool2_decimal

if (ocean_obj.inv == 1){
  ocean_obj.ss_scrt = ocean_obj.pool2/ocean_obj.pool1
}else {
  ocean_obj.ss_scrt = ocean_obj.pool1/ocean_obj.pool2
}

setSOCEAN_SETH(ocean_obj.ss_scrt)


if (ocean_obj.uni_scrt < ocean_obj.ss_scrt){
  ocean_obj.diff = ((ocean_obj.ss_scrt - ocean_obj.uni_scrt)/ocean_obj.uni_scrt)*100 
}else{
  ocean_obj.diff = ((ocean_obj.uni_scrt - ocean_obj.ss_scrt)/ocean_obj.ss_scrt)*100
}

setOCEANDIF(ocean_obj.diff)

// Query Pair Price ocean  End --------------------------------------



// Query Pair Price mana  Start --------------------------------------

mana_obj.uni_eth = manaData && manaData.tokens[0].derivedETH
mana_obj.uni_scrt =  wscrtPriceInEth / mana_obj.uni_eth 

mana_obj.ss_query = await client.queryContractSmart(
  mana_obj.secret,
  { pool: {} }
)

mana_obj.pool1 = mana_obj.ss_query.assets[0].amount / mana_obj.pool1_decimal
mana_obj.pool2 = mana_obj.ss_query.assets[1].amount / mana_obj.pool2_decimal

if (mana_obj.inv == 1){
  mana_obj.ss_scrt = mana_obj.pool2/mana_obj.pool1
}else {
  mana_obj.ss_scrt = mana_obj.pool1/mana_obj.pool2
}

set_mana_eth(mana_obj.ss_scrt)


if (mana_obj.uni_scrt < mana_obj.ss_scrt){
  mana_obj.diff = ((mana_obj.ss_scrt - mana_obj.uni_scrt)/mana_obj.uni_scrt)*100 
}else{
  mana_obj.diff = ((mana_obj.uni_scrt - mana_obj.ss_scrt)/mana_obj.ss_scrt)*100
}

set_mana_dif(mana_obj.diff)

// Query Pair Price mana  End --------------------------------------




// Query Pair Price uni  Start --------------------------------------

uni_obj.uni_eth = uniData && uniData.tokens[0].derivedETH
uni_obj.uni_scrt =  wscrtPriceInEth / uni_obj.uni_eth 

uni_obj.ss_query = await client.queryContractSmart(
  uni_obj.secret,
  { pool: {} }
)

uni_obj.pool1 = uni_obj.ss_query.assets[0].amount / uni_obj.pool1_decimal
uni_obj.pool2 = uni_obj.ss_query.assets[1].amount / uni_obj.pool2_decimal

if (uni_obj.inv == 1){
  uni_obj.ss_scrt = uni_obj.pool2/uni_obj.pool1
}else {
  uni_obj.ss_scrt = uni_obj.pool1/uni_obj.pool2
}

set_uni_eth(uni_obj.ss_scrt)


if (uni_obj.uni_scrt < uni_obj.ss_scrt){
  uni_obj.diff = ((uni_obj.ss_scrt - uni_obj.uni_scrt)/uni_obj.uni_scrt)*100 
}else{
  uni_obj.diff = ((uni_obj.uni_scrt - uni_obj.ss_scrt)/uni_obj.ss_scrt)*100
}

set_uni_dif(uni_obj.diff)

// Query Pair Price uni  End --------------------------------------


// Query Pair Price yfi  Start --------------------------------------

yfi_obj.uni_eth = yfiData && yfiData.tokens[0].derivedETH
yfi_obj.uni_scrt =  wscrtPriceInEth / yfi_obj.uni_eth 

yfi_obj.ss_query = await client.queryContractSmart(
  yfi_obj.secret,
  { pool: {} }
)

yfi_obj.pool1 = yfi_obj.ss_query.assets[1].amount / yfi_obj.pool1_decimal
yfi_obj.pool2 = yfi_obj.ss_query.assets[0].amount / yfi_obj.pool2_decimal

if (yfi_obj.inv == 1){
  yfi_obj.ss_scrt = yfi_obj.pool2/yfi_obj.pool1
}else {
  yfi_obj.ss_scrt = yfi_obj.pool1/yfi_obj.pool2
}

set_yfi_eth(yfi_obj.ss_scrt)


if (yfi_obj.uni_scrt < yfi_obj.ss_scrt){
  yfi_obj.diff = ((yfi_obj.ss_scrt - yfi_obj.uni_scrt)/yfi_obj.uni_scrt)*100 
}else{
  yfi_obj.diff = ((yfi_obj.uni_scrt - yfi_obj.ss_scrt)/yfi_obj.ss_scrt)*100
}

set_yfi_dif(yfi_obj.diff)

// Query Pair Price yfi  End --------------------------------------




}



main().catch((err) => {
  console.error(err)
})

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={uniswapLogo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; Backdoor Arbs
        </a>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              
              
              
              
              
              <div className="row">
                <div className="column">
                  <img src={wscrtLogo} width="150" height="150" className="mb-4" alt="" />
                  <h3>💸 {' '}{(parseFloat(wscrtPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}</h3>
                  <h3>🦄 {' '}{(parseFloat(wscrtPriceInEth)).toFixed(9)}</h3>
                  <h3>🤐 {' '}{(parseFloat(SSCRT_SETH)).toFixed(9)}</h3>
                  <h3>&#9651; {' '}{(parseFloat(SEDIF)).toFixed(2)}%</h3>
                </div>
                
                
                
                
                
                
                
                <div  className="column">
                 <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x2b89bf8ba858cd2fcee1fada378d5cd6936968be&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7"><img src={scrtusdtLogo} width="150" height="150" className="mb-4" alt="" /></a>
                  
                  
                <h3>
                🦄 ${''}
                {ethLoading || usdtLoading
                  ? 'Loading token data...'
                  : '' +
                    // parse responses as floats and fix to 2 decimals
                    (parseFloat(usdt_obj.uni_scrt)).toFixed(2)}
              </h3>
              <h3>
              🤐 ${''}
              {ethLoading || usdtLoading
                ? 'Loading token data...'
                : '' +
                  // parse responses as floats and fix to 2 decimals
                  (parseFloat(SUSDT_SETH)).toFixed(2)}
             </h3>
             <h3>
             &#9651; {' '}
             {ethLoading || usdtLoading
              ? 'Loading token data...'
              : '' +
                // parse responses as floats and fix to 2 decimals
                (parseFloat(USDTDIF)).toFixed(2)}%
             </h3>
                 
                 
                 
                 
                 
                 
                 </div>
                 
                 
                 
                 
                 
                <div className="column">
                  <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x2b89bf8ba858cd2fcee1fada378d5cd6936968be&outputCurrency=0x3155ba85d5f96b2d030a4966af206230e46849cb"><img src={runeLogo} width="150" height="150" className="mb-4" alt="" /></a>
                  <h3>💸 ${(parseFloat(rune_obj.uni_eth) * parseFloat(ethPriceInUSD)).toFixed(2)}</h3>
                  <h3><a target="_blank" href="https://app.sushi.com/swap?inputCurrency=0x2b89bf8ba858cd2fcee1fada378d5cd6936968be&outputCurrency=0x3155ba85d5f96b2d030a4966af206230e46849cb">🍣</a> <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x2b89bf8ba858cd2fcee1fada378d5cd6936968be&outputCurrency=0x3155ba85d5f96b2d030a4966af206230e46849cb">🦄</a>{' '}{(parseFloat(rune_obj.uni_scrt)).toFixed(4)}</h3>
                  <h3>🤐 {' '}{(parseFloat(SRUNE_SETH)).toFixed(4)}</h3>
                  <h3>&#9651; {' '}{(parseFloat(RUNEDIF)).toFixed(2)}%</h3>
              </div>
              
              
              <div className="column">
              <a target="_blank" href="#"><img src={oceanLogo} width="150" height="150" className="mb-4" alt="" /></a>
              <h3>💸 ${(parseFloat(ocean_obj.uni_eth) * parseFloat(ethPriceInUSD)).toFixed(2)}</h3>
              <h3><a target="_blank" href="https://app.sushi.com/swap?inputCurrency=0x2b89bf8ba858cd2fcee1fada378d5cd6936968be&outputCurrency=0x3155ba85d5f96b2d030a4966af206230e46849cb">🍣</a> <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x2b89bf8ba858cd2fcee1fada378d5cd6936968be&outputCurrency=0x3155ba85d5f96b2d030a4966af206230e46849cb">🦄</a>{' '}{(parseFloat(ocean_obj.uni_scrt)).toFixed(4)}</h3>
              <h3>🤐 {' '}{(parseFloat(SOCEAN_SETH)).toFixed(4)}</h3>
              <h3>&#9651; {' '}{(parseFloat(OCEANDIF)).toFixed(2)}%</h3>
          </div>
          
          
              
              
              
          
          
            
            <div  className="column">
            <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x2b89bf8ba858cd2fcee1fada378d5cd6936968be&outputCurrency=0x514910771af9ca656af840dff83e8264ecf986ca"><img src={linkLogo} width="150" height="150" className="mb-4" alt="" /></a>
            <h3>
              💸 {' '}
              {ethLoading || linkLoading
                ? 'Loading token data...'
                : '$' +
                  // parse responses as floats and fix to 2 decimals
                  (parseFloat(linkPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
            </h3>
            <h3>
            {' '}
            {ethLoading || linkLoading
              ? 'Loading token data...'
              : 'Ξ' +
                // parse responses as floats and fix to 2 decimals
                (parseFloat(linkPriceInEth)).toFixed(6)}
          </h3>
          <h3>
          🦄 {' '}
          {ethLoading || linkLoading
            ? 'Loading token data...'
            : '' +
              // parse responses as floats and fix to 2 decimals
              (parseFloat(link_wscrt)).toFixed(6)}
        </h3>
        <h3>
        🤐 {' '}
        {ethLoading || linkLoading
          ? 'Loading token data...'
          : '' +
            // parse responses as floats and fix to 2 decimals
            (parseFloat(SLINK_SETH)).toFixed(6)}
      </h3>
      <h3>
      &#9651; {' '}
      {ethLoading || wscrtLoading
        ? 'Loading token data...'
        : '' +
          // parse responses as floats and fix to 2 decimals
          (parseFloat(LINKDIF)).toFixed(2)}%
    </h3>
    
        
     </div>
         
            
            
          
           
           
           
           
           
        <div className="column">
        <a target="_blank" href="#"><img src={uniLogo} width="150" height="150" className="mb-4" alt="" /></a>
        <h3>💸 ${(parseFloat(uni_obj.uni_eth) * parseFloat(ethPriceInUSD)).toFixed(2)}</h3>
        <h3>🦄 {' '}{(parseFloat(uni_obj.uni_scrt)).toFixed(4)}</h3>
        <h3>🤐 {' '}{(parseFloat(uni_eth)).toFixed(4)}</h3>
        <h3>&#9651; {' '}{(parseFloat(uni_dif)).toFixed(2)}%</h3>
    </div>
        
           </div>
           <div className="row">
     
     
     
  
  
  
     
    
 
 
      
     
            <div  className="column">
            <img src={btcLogo} width="150" height="150" className="mb-4" alt="" />
            <h3>
              💸 {' '}
              {ethLoading || wbtcLoading
                ? 'Loading token data...'
                : '$' +
                  // parse responses as floats and fix to 2 decimals
                  (parseFloat(wbtcPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
            </h3>
            <h3>
            {' '}
            {ethLoading || wbtcLoading
              ? 'Loading token data...'
              : 'Ξ' +
                // parse responses as floats and fix to 2 decimals
                (parseFloat(wbtcPriceInEth)).toFixed(6)}
          </h3>
          <h3>
          🦄 {' '}
          {ethLoading || wbtcLoading
            ? 'Loading token data...'
            : '' +
              // parse responses as floats and fix to 2 decimals
              (parseFloat(wbtc_wscrt)).toFixed(6)}
        </h3>
        <h3>
        🤐 {' '}
        {ethLoading || wbtcLoading
          ? 'Loading token data...'
          : '' +
            // parse responses as floats and fix to 2 decimals
            (parseFloat(SWBTC_SETH)).toFixed(6)}
      </h3>
      <h3>
      &#9651; {' '}
      {ethLoading || wbtcLoading
        ? 'Loading token data...'
        : '' +
          // parse responses as floats and fix to 2 decimals
          (parseFloat(WBTCDIF)).toFixed(2)}%
    </h3>
    
        
     </div>
     
     
     
     <div  className="column">
     <img src={btcethLogo} width="150" height="150" className="mb-4" alt="" />
     <h3>
       🦄 💸 {' '}
       {ethLoading || wbtcLoading
         ? 'Loading token data...'
         : '$' +
           // parse responses as floats and fix to 2 decimals
           (parseFloat(wbtcPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
     </h3>
     
   <h3>
    🤐 💸 {' '}
   {ethLoading || wbtcLoading
     ? 'Loading token data...'
     : '$' +
       // parse responses as floats and fix to 2 decimals
       (parseFloat(SWBTC_SETH_2) * parseFloat(ethPriceInUSD)).toFixed(2)}
 </h3>
 
 <h3>
  🦄 Ξ{' '}
  {ethLoading || wbtcLoading
    ? 'Loading token data...'
    : '' +
      // parse responses as floats and fix to 2 decimals
      (parseFloat(wbtcPriceInEth)).toFixed(6)}
</h3>

 <h3>
 🤐 Ξ{' '}
 {ethLoading || wbtcLoading
   ? 'Loading token data...'
   : '' +
     // parse responses as floats and fix to 2 decimals
     (parseFloat(SWBTC_SETH_2)).toFixed(6)}
</h3>
<h3>
&#9651; {' '}
{ethLoading || wbtcLoading
 ? 'Loading token data...'
 : '' +
   // parse responses as floats and fix to 2 decimals
   (parseFloat(WBTCDIF_2)).toFixed(2)}%
</h3>

 
</div>



     
     
     
     <hr />
     
     <div  className="column">
     <img src={rsrLogo} width="150" height="150" className="mb-4" alt="" />
     <h3>
       💸 {' '}
       {ethLoading || rsrLoading
         ? 'Loading token data...'
         : '$' +
           // parse responses as floats and fix to 2 decimals
           (parseFloat(rsrPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
     </h3>
     <h3>
     {' '}
     {ethLoading || rsrLoading
       ? 'Loading token data...'
       : 'Ξ' +
         // parse responses as floats and fix to 2 decimals
         (parseFloat(rsrPriceInEth)).toFixed(6)}
   </h3>
   <h3>
   🦄 {' '}
   {ethLoading || rsrLoading
     ? 'Loading token data...'
     : '' +
       // parse responses as floats and fix to 2 decimals
       (parseFloat(rsr_wscrt)).toFixed(6)}
 </h3>
 <h3>
 🤐 {' '}
 {ethLoading || rsrLoading
   ? 'Loading token data...'
   : '' +
     // parse responses as floats and fix to 2 decimals
     (parseFloat(SRSR_SETH)).toFixed(6)}
</h3>
<h3>
&#9651; {' '}
{ethLoading || rsrLoading
 ? 'Loading token data...'
 : '' +
   // parse responses as floats and fix to 2 decimals
   (parseFloat(RSRDIF)).toFixed(2)}%
</h3>

 
</div>
       
       <div className="column">
       <a target="_blank" href="#"><img src={yfiLogo} width="150" height="150" className="mb-4" alt="" /></a>
       <h3>💸 ${(parseFloat(yfi_obj.uni_eth) * parseFloat(ethPriceInUSD)).toFixed(2)}</h3>
       <h3>🦄 {' '}{(parseFloat(yfi_obj.uni_scrt)).toFixed(4)}</h3>
       <h3>🤐 {' '}{(parseFloat(yfi_eth)).toFixed(4)}</h3>
       <h3>&#9651; {' '}{(parseFloat(yfi_dif)).toFixed(2)}%</h3>
   </div>
   
       
       <div className="column">
        <a target="_blank" href="#"><img src={manaLogo} width="150" height="150" className="mb-4" alt="" /></a>
        <h3>💸 ${(parseFloat(mana_obj.uni_eth) * parseFloat(ethPriceInUSD)).toFixed(2)}</h3>
        <h3>🦄 {' '}{(parseFloat(mana_obj.uni_scrt)).toFixed(4)}</h3>
        <h3>🤐 {' '}{(parseFloat(mana_eth)).toFixed(4)}</h3>
        <h3>&#9651; {' '}{(parseFloat(mana_dif)).toFixed(2)}%</h3>
    </div>
    
    
    
    
        
        <div  className="column">
         <img src={siennaLogo} width="150" height="150" className="mb-4" alt="" />
         <h3>
           💸 {' '}
           {ethLoading || siennaLoading
             ? 'Loading token data...'
             : '$' +
               // parse responses as floats and fix to 2 decimals
               (parseFloat(siennaPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
         </h3>
         <h3>
         {' '}
         {ethLoading || siennaLoading
           ? 'Loading token data...'
           : 'Ξ' +
             // parse responses as floats and fix to 2 decimals
             (parseFloat(siennaPriceInEth)).toFixed(6)}
       </h3>
       <h3>
       🦄 {' '}
       {ethLoading || siennaLoading
         ? 'Loading token data...'
         : '' +
           // parse responses as floats and fix to 2 decimals
           (parseFloat(sienna_wscrt)).toFixed(6)}
     </h3>
     <h3>
     🤐 {' '}
     {ethLoading || siennaLoading
       ? 'Loading token data...'
       : '' +
         // parse responses as floats and fix to 2 decimals
         (parseFloat(SSIENNA_SETH)).toFixed(6)}
    </h3>
    <h3>
    &#9651; {' '}
    {ethLoading || siennaLoading
     ? 'Loading token data...'
     : '' +
       // parse responses as floats and fix to 2 decimals
       (parseFloat(SIENNADIF)).toFixed(2)}%
    </h3>
    
    
        
        </div>
        
        
        </div>
        
        
        
            
            
            
            
            
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App
