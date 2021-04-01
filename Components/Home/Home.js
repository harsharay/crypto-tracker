import React, { useEffect, useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
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
        color: (opacity = 1) => `rgba(66, 245, 141, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional,
        decimalPlaces: 4,
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
                const { symbol, lastPrice, priceChangePercent, volume, openPrice, prevClosePrice  } = item
                return {
                    symbol,
                    lastPrice : parseFloat(lastPrice).toFixed(2),
                    priceChangePercent : parseFloat(priceChangePercent).toFixed(2),
                    volume: parseFloat(volume).toFixed(2),
                    data: {
                        labels: [],
                        datasets: [
                          {
                            data: [parseInt(prevClosePrice), parseInt(openPrice), parseInt(lastPrice), ],
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
            <View style={styles.coinDetails}>
                <Text style={styles.title}>{symbol}</Text>
                <View style={styles.coinMetaDetails}>
                    <Text style={[styles.coinMetaText, styles.coinMetaTextBackground]}>{index+1}</Text>
                    <Text style={styles.coinMetaText}>{symbol}</Text>
                    <Text style={priceChangePercent > 0 ? [styles.coinMetaText, styles.green] : [styles.coinMetaText, styles.red]}>{priceChangePercent > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}{priceChangePercent} %</Text>
                </View>
            </View>
            <LineChart 
                data={data}
                width={100}
                height={50}
                chartConfig={chartConfig}
                bezier
                withHorizontalLabels={false} 
                style={{ flex: 33}}
            />
            <Text style={styles.price}>${lastPrice}</Text>
            {/* <Text style={styles.otherContent}>{volume}</Text> */}
          
          
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
            <StatusBar style="auto"/>
            <ScrollView horizontal={true} style={styles.horizontalScrollGroup} contentContainerStyle={styles.containerStyle}>
                <TouchableOpacity style={styles.horizontalScrollItem}>USD</TouchableOpacity>
                <TouchableOpacity style={styles.horizontalScrollItem}>Sort by rank</TouchableOpacity>
                <TouchableOpacity style={styles.horizontalScrollItem}>Top 50</TouchableOpacity>
                <TouchableOpacity style={styles.horizontalScrollItem}>% (24h)</TouchableOpacity>
            </ScrollView>
            { coinData.length > 0 && <FlatList data={topHunderdData} renderItem={displayList} keyExtractor={(item,index) => index.toString()} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    coinDetails : {
        flex: 33,
        flexDirection: 'column',
        width: '25%',
    },

    coinMetaDetails : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 0,
    },  

    coinMetaText : {
        fontSize: '10px'
    },

    coinMetaTextBackground : {
        backgroundColor: '#EBEEF1',
        padding: 3,
    },

    green: {
        color: '#16C784'
    },

    red: {
        color: 'red'
    },

    item: {
        // backgroundColor: '#f9c2ff',
        padding: 10,
        paddingLeft: 30,
        // marginVertical: 8,
        // marginHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#F8F8F8'
    },

    title: {
        fontSize: 14,
        textAlign: 'left',
        // alignSelf: 'stretch',
        // borderWidth: 1,
        flex: '1',
        marginBottom: '10px'
    },

    otherContent: {
        fontSize: 14,
        textAlign: 'left',
        // alignSelf: 'stretch',
        // borderWidth: 1,
        flex: '33',
        marginBottom: '10px'
    },

    price: {
        // fontSize: 13,
        // textAlign: 'left',
        // alignSelf: 'stretch',
        // color: '#16C784',
        flex: '33',
        marginLeft: '30px'
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
    },

    horizontalScrollGroup : {
        padding: 10,
        // width: '150%',
    },

    horizontalScrollItem : {
        backgroundColor: '#EBEEF1',
        padding: 10,
        borderRadius: '20px',
        fontWeight: 600,
    },

    containerStyle : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default Home;