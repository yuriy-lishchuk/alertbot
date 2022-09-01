### Comments


### UNISWAP Graph

Each token has a token address e.g. 0x2b89bf8ba858cd2fcee1fada378d5cd6936968be

Derive ETH price (price in ETH)
Derive USD price (price in eth * eth price in USD)
Derive SCRT price (price in eth / wscrt price in eth)

for reference SCRT and sSCRT and wSCRT are basically the same, they just exist on different platforms


The Apollo client pulls all these, i dont know if it could be done in one call, or how this works, i set a 15000 poll interval (15 seconds)


### Use state variables

I have set these up to populate with the upcoming rust variables that i get from secret.js and call them later down below


### secret js
```
  const price = await client.queryContractSmart(
    'secret14zv2fdsfwqzxqt7s2ushp4c4jr56ysyld5zcdf',
    { pool: {} }
  )


var pool1 = price.assets[0].amount
var pool2 = price.assets[1].amount
```


These aren't by token but by pool. So each pool is made up of two assets

it takes the asset from each pool and gets the price. Generally this pool is going to be price / SCRT. 
you have to correct for decimal place so 


```
pool1 = pool1/1000000
pool2 = pool2/1000000000000000000
```

I don't mind filling all this out manually, since each pool is going to be somewhat unique

The ETH / BTC pool is slightly different since that doesnt pool with SCRT but pools with ETH / BTC

Then i calculate the ratio / price per scrt 
```
console.clear()
console.log('******************************************')
console.log('RUNE INFO')
console.log('Uniswap RUNE / WSCRT', rune_wscrt)
console.log('SecretSwap sRUNE / sSCRT', ratio2)
var diff = ratio2 - rune_wscrt
var diff_percent = (diff / rune_wscrt)*100
console.log('Difference', diff)
console.log('Difference ', parseFloat(diff_percent).toFixed(2), '%')


setSRUNE_SETH(ratio2)


var runedif = 0
if (rune_wscrt < ratio2){
  runedif = ((ratio2 - rune_wscrt)/rune_wscrt)*100 
}else{
  runedif = ((rune_wscrt - ratio2)/ratio2)*100
}

setRUNEDIF(runedif)
```

I now compare uni vs secretswap and get the difference

Then i set it with the set variable so i can see it in react state on front end



### react

just shows a card with price in USD from uni, price in scrt from uni, price in scrt from secretswap, and the difference. 

Ideally i think each pair would show price in 
ETH 
USD
SCRT

and show the difference between each. This may get a little more confusing but I think that will be the goal. Also the ability to more easily add more tokens / pairs as they come up. I dont mind doing them manually. 

Then next step is to add a simple API call to coin market cap or binance and compare USD price or ETH price




