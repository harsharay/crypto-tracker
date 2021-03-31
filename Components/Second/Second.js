import React, { useEffect, useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { LineChart } from "react-native-chart-kit"

const Second = () => {

    const data = [20,30,50,10,5,90]

    return (
        <View>
            <LineChart 
                data={data}
                width={screenWidth}
                height={220}
            />
        </View>
    )
}

export default Second;