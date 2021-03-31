import React, { useEffect, useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Home = () => {

    const [coinData, setCoinData] = useState([])
    const [topHunderdData, setTopHundredData] = useState([])

    useEffect(() => {
        fetch("https://api.binance.com/api/v3/ticker/24hr")
        .then(data => data.json())
        .then(json => {
            setCoinData(json)
            console.log(json)
        })
    },[])

    useEffect(() => {
        if(coinData.length > 0){
            let tempCoinData = coinData

            tempCoinData = tempCoinData.filter(item => {
                return (
                    item.symbol.indexOf('USDT') > -1
                )
            })

            tempCoinData = tempCoinData.map(item => {
                let usdtIndex = item.symbol.indexOf('USDT')
                item.symbol = item.symbol.slice(0, usdtIndex)
                return (
                    item
                )
            })

            tempCoinData.sort((a,b) => {
                if(parseInt(a.price) > parseInt(b.price)){
                    return -1
                } else {
                    return 1
                }
            })
            console.log(35, tempCoinData)


            let convertedData = tempCoinData.map(item => {
                const { symbol, lastPrice, priceChange, volume } = item
                return {
                    symbol,
                    lastPrice : parseInt(lastPrice).toFixed(2),
                    priceChange: parseInt(priceChange).toFixed(2),
                    volume: parseInt(volume).toFixed(2)
                }
            })

            setTopHundredData(convertedData.slice(0,101))
        }
    },[coinData])

    const Item = ({ symbol, lastPrice, index, priceChange, volume }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{index+1}. {symbol}</Text>
          <Text style={styles.title}>{lastPrice}</Text>
          <Text style={styles.title}>{priceChange}</Text>
          <Text style={styles.title}>{volume}</Text>
        </View>
    );

    const displayList = ({item, index}) => <Item symbol={item.symbol} lastPrice={item.lastPrice} index={index} priceChange={item.priceChange} volume={item.volume}/>

    return (
        <View style={styles.styledView}>
            {/* <Text style={styles.styledText}>Welcome!</Text> */}
            <StatusBar style="auto"/>
            <View style={styles.columnHeader}>
                <Text>Coin</Text>
                <Text>Price</Text>
                <Text>24hr</Text>
                <Text>Volume</Text>
            </View>
            { coinData.length > 0 && <FlatList data={topHunderdData} renderItem={displayList} keyExtractor={(item,index) => index.toString()} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    styledView : {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    styledText : {
        color: 'red'
    },

    item: {
        // backgroundColor: '#f9c2ff',
        padding: 10,
        paddingLeft: 2,
        marginVertical: 8,
        marginHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 14,
        textAlign: 'left',
        alignSelf: 'stretch',
        // borderWidth: 1,
        flex: '1'
    },

    columnHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
        borderWidth: 1,
        fontSize: '24px',
        fontWeight: '700'
    }
})

export default Home;