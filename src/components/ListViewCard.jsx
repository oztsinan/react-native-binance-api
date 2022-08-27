import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";

const ListViewCard = ({ symbol, firstCoinName, secondaryCoinName, price, changePrice, volume }) => {

    const navigation = useNavigation()

    function numFormatter(num) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
        } else if (num < 900) {
            return num; // if value < 1000, nothing to do
        }
    }

    function priceFormatter(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }



    return (
        <TouchableNativeFeedback>
            <View style={styles.listViewCard}>

                <View style={styles.listViewCardLeft}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                        <Text style={{ fontSize: 17, fontWeight: '500' }} >{firstCoinName} </Text>
                        <Text style={{ fontSize: 12, marginTop: 0, fontWeight: '500' }}>/</Text>
                        <Text style={{ fontSize: 12, marginTop: 2, fontWeight: '350', color: 'rgb(101,115,133)' }}> {secondaryCoinName}</Text>
                    </View>
                    <Text style={{ fontSize: 12, marginTop: -17, fontWeight: '350', color: 'rgb(101,115,133)' }}  >Hacim {numFormatter(volume)}$ </Text>
                </View>
                <View style={styles.listViewCardRight}>
                    <View style={{ marginRight: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={changePrice < 0 ? { color: 'rgb(253,63,84)', fontSize: 15, fontWeight: '500' } : { display: 'none' }}  > {priceFormatter(price)} </Text>
                        <Text style={changePrice > 0 ? { color: 'rgb(0,181,125)', fontSize: 15, fontWeight: '500' } : { display: 'none' }}  > {priceFormatter(price)} </Text>
                        <Text style={changePrice == 0 ? { color: 'black', fontSize: 15, fontWeight: '500' } : { display: 'none' }}  > {priceFormatter(price)} </Text>
                        <Text style={{ fontSize: 13, fontWeight: '350', color: 'rgb(101,115,133)' }}> ₺{(price * 18.3).toFixed(2)} </Text>
                    </View>
                    <View style={changePrice == 0 ? styles.listViewCardChangePriceBoxGray : changePrice < 0 ? styles.listViewCardChangePriceBoxRed : styles.listViewCardChangePriceBoxGreen}>
                        <Text style={changePrice < 0 ? { display: 'flex', color: 'white', fontWeight: '600' } : { display: 'none' }}> -%{changePrice.toFixed(2)} </Text>
                        <Text style={changePrice > 0 ? { display: 'flex', color: 'white', fontWeight: '600' } : { display: 'none' }}> +%{changePrice.toFixed(2)} </Text>
                        <Text style={changePrice == 0 ? { display: 'flex', color: 'white', fontWeight: '600' } : { display: 'none' }}> %{changePrice.toFixed(2)} </Text>

                    </View>
                </View>

            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    listViewCard: {
        width: '100%',
        height: 55,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    listViewCardLeft: {
        width: '40%',
        height: '100%',
        marginLeft: 20,
        marginBottom: 14

    },
    listViewCardRight: {
        width: '60%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: -40
    },
    listViewCardChangePriceBoxRed: {
        width: 75,
        height: 36,
        backgroundColor: 'rgb(253,63,84)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    listViewCardChangePriceBoxGreen: {
        width: 75,
        height: 36,
        backgroundColor: 'rgb(0,181,125)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    listViewCardChangePriceBoxGray: {
        width: 75,
        height: 36,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})

export default ListViewCard