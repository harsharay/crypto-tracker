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
            setTopHundredData(tempCoinData.slice(0,101))
        }
    },[coinData])

    const Item = ({ symbol, lastPrice }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{symbol} : ${lastPrice}</Text>
        </View>
    );

    const displayList = ({item, index}) => <Item symbol={item.symbol} lastPrice={parseInt(item.lastPrice).toFixed(2)} index={index}/>

    return (
        <View style={styles.styledView}>
            {/* <Text style={styles.styledText}>Welcome!</Text> */}
            <StatusBar style="auto"/>
            { coinData.length > 0 && <FlatList data={topHunderdData} renderItem={displayList} keyExtractor={(item,index) => index.toString()} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    styledView : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    styledText : {
        color: 'red'
    },

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    title: {
        fontSize: 14,
    },
})

export default Home;