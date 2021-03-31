import React, { useEffect, useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AiFillCaretUp } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { LineChart } from "react-native-chart-kit"


const Home = () => {

    const [coinData, setCoinData] = useState([])
    const [topHunderdData, setTopHundredData] = useState([])

    const chartConfig = {
        backgroundGradientFrom: "white",
        // backgroundGradientFromOpacity: 10,
        backgroundGradientTo: "white",
        // backgroundGradientToOpacity: 5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

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
                const { symbol, lastPrice, priceChangePercent, volume, openPrice  } = item
                return {
                    symbol,
                    lastPrice : parseFloat(lastPrice).toFixed(2),
                    priceChangePercent : parseFloat(priceChangePercent).toFixed(2),
                    volume: parseFloat(volume).toFixed(2),
                    data: {
                        labels: [],
                        datasets: [
                          {
                            data: [parseInt(lastPrice), parseInt(openPrice)],
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                            strokeWidth: 2 // optional
                          }
                        ],
                    },
                }
            })

            setTopHundredData(convertedData.slice(0,101))
        }
    },[coinData])

    const Item = ({ symbol, lastPrice, index, priceChangePercent, volume, data }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{index+1}. {symbol}</Text>
          <Text style={styles.price}>{lastPrice} $</Text>
          <Text style={styles.price}>{priceChangePercent > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}{priceChangePercent} %</Text>
          <Text style={styles.title}>{volume}</Text>
          {/* {JSON.stringify(data)} */}
          <LineChart 
                data={data}
                width={100}
                height={50}
                chartConfig={chartConfig}
                withHorizontalLabels={false} />
        </View>
    );

    const displayList = ({item, index}) => <Item 
                                            symbol={item.symbol} 
                                            lastPrice={item.lastPrice} 
                                            index={index} 
                                            priceChangePercent={item.priceChangePercent}
                                            volume={item.volume} 
                                            data={item.data} />

    return (
        <View style={styles.styledView}>
            <Text style={styles.styledText}>Welcome!</Text>
            <StatusBar style="auto"/>
            <View style={styles.columnHeader}>
                <Text>Coin</Text>
                <Text>Price</Text>
                <Text>24hr</Text>
                <Text>Volume</Text>
                <Text>Change</Text>
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
        // paddingLeft: 2,
        marginVertical: 8,
        marginHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    title: {
        fontSize: 13,
        textAlign: 'left',
        alignSelf: 'stretch',
        // borderWidth: 1,
        flex: '1'
    },

    price: {
        fontSize: 13,
        textAlign: 'left',
        alignSelf: 'stretch',
        color: '#16C784',
        flex: '1'
    },

    columnHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 30,
        borderWidth: 1,
        fontSize: '24px',
        fontWeight: '700'
    }
})

export default Home;