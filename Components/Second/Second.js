import React, { useEffect, useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit"


const Second = () => {
    const screenWidth = Dimensions.get("window").width;


    const peta = {
        labels: [],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        // legend: ["Rainy Days"] // optional
      };

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

    return (
        <View>
            <LineChart 
                data={peta}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    )
}

export default Second;