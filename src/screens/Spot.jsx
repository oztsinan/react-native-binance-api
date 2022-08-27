import { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, RefreshControl, TextInput } from "react-native";
import axios from "axios";
import 'expo-dev-menu'
import ListViewCard from "../components/ListViewCard";

const Spot = () => {

    const [refreshControl, setRefreshControl] = useState(false)
    const [listData, setListData] = useState([])
    const [busdBtn, setBusdBtn] = useState(true)
    const [usdtBtn, setUsdtBtn] = useState(false)
    const [bnbBtn, setBnbBtn] = useState(false)
    const [btcBtn, setBtcBtn] = useState(false)
    var listDataArray = []

    const coinListener = useRef()
    const [searchInput, setSearchInput] = useState('')



    const getData = async () => {
        await axios.get('https://api.binance.com/api/v3/ticker/24hr')
            .then((response) => {

                response.data.map((item) => (
                    item.lastPrice > 0.00000 ? listDataArray.push({
                        symbol: item.symbol,
                        price: parseFloat(item.lastPrice),
                        priceChange: parseFloat(item.priceChangePercent),
                        volume: item.quoteVolume
                    }) : null
                )
                )
                setListData(listDataArray)
            })

        setRefreshControl(false)
    }


    const _onRefresh = () => {
        setRefreshControl(true)
        getData()
    }

    const sortData = (ilkAranan, ikinciAranan) => {

        var searchData = []

        listData.map((item) => (
            ilkAranan.length > 1 && ikinciAranan == '' ? (item.symbol.substr(0, ilkAranan.length) == ilkAranan ? searchData.push({ symbol: item.symbol, price: item.price, priceChange: item.priceChange, volume: item.volume, firstCoinName: ilkAranan, secondaryCoinName: item.symbol.substr(ilkAranan.length, item.symbol.length) }) : null) : null ||
                ikinciAranan.length > 1 && ilkAranan == '' ? (item.symbol.substr(ikinciAranan.length, item.symbol.length) == ikinciAranan ? searchData.push({ symbol: item.symbol, price: item.price, priceChange: item.priceChange, volume: item.volume, firstCoinName: item.symbol.substr(0, ikinciAranan.length), secondaryCoinName: ikinciAranan }) : null) : null ||
                    ikinciAranan.length > 1 && ilkAranan.length > 1 ? (item.symbol == ilkAranan + ikinciAranan ? searchData.push({ symbol: item.symbol, price: item.price, priceChange: item.priceChange, volume: item.volume, firstCoinName: ilkAranan, secondaryCoinName: ikinciAranan }) : null) : null
        ))

        //return searchData.sort((a, b) => b.volume - a.volume)
        return searchData
    }

    const searcSortData = (input) => {


        var editInput = input.replace(/\s/g, '');
        var searchData = []

        listData.map((item) => (
            item.symbol.match(editInput) ? searchData.push({
                symbol: item.symbol,
                price: item.price,
                priceChange: item.priceChange,
                volume: item.volume,
                firstCoinName:

                    item.symbol.match('USDT') ? item.symbol.substr(item.symbol.length - 4, item.symbol.length) : null ||
                        item.symbol.match('BTC') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null ||
                            item.symbol.match('BUSD') ? item.symbol.substr(item.symbol.length - 4, item.symbol.length) : null ||
                                item.symbol.match('EUR') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null ||
                                    item.symbol.match('GBP') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null ||
                                        item.symbol.match('TRY') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null ||
                                            item.symbol.match('BRL') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null ||
                                                item.symbol.match('RUB') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null ||
                                                    item.symbol.match('AUD') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null ||
                                                        item.symbol.match('BIDR') ? item.symbol.substr(item.symbol.length - 4, item.symbol.length) : null ||
                                                            item.symbol.match('USDC') ? item.symbol.substr(item.symbol.length - 4, item.symbol.length) : null ||
                                                                item.symbol.match('BNB') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null ||
                                                                    item.symbol.match('ETH') ? item.symbol.substr(item.symbol.length - 3, item.symbol.length) : null


                ,
                secondaryCoinName:

                    item.symbol.match('USDT') ? item.symbol.substr(0, item.symbol.length - 4) : null ||
                        item.symbol.match('BTC') ? item.symbol.substr(0, item.symbol.length - 3) : null ||
                            item.symbol.match('BUSD') ? item.symbol.substr(0, item.symbol.length - 4) : null ||
                                item.symbol.match('EUR') ? item.symbol.substr(0, item.symbol.length - 3) : null ||
                                    item.symbol.match('GBP') ? item.symbol.substr(0, item.symbol.length - 3) : null ||
                                        item.symbol.match('TRY') ? item.symbol.substr(0, item.symbol.length - 3) : null ||
                                            item.symbol.match('BRL') ? item.symbol.substr(0, item.symbol.length - 3) : null ||
                                                item.symbol.match('RUB') ? item.symbol.substr(0, item.symbol.length - 3) : null ||
                                                    item.symbol.match('AUD') ? item.symbol.substr(0, item.symbol.length - 3) : null ||
                                                        item.symbol.match('BIDR') ? item.symbol.substr(0, item.symbol.length - 4) : null ||
                                                            item.symbol.match('USDC') ? item.symbol.substr(0, item.symbol.length - 4) : null ||
                                                                item.symbol.match('BNB') ? item.symbol.substr(0, item.symbol.length - 3) : null ||
                                                                    item.symbol.match('ETH') ? item.symbol.substr(0, item.symbol.length - 3) : null



            }) : null
        ))

        //return searchData.sort((a, b) => b.volume - a.volume)
        return searchData
    }


    useEffect(() => {

        getData()

    }, [])

    const btnSelector = (value) => {
        setBnbBtn(false)
        setBtcBtn(false)
        setBusdBtn(false)
        setUsdtBtn(false)
        value(true)

    }

    const lastResults = (input) => {


        if (input.length > 1) {
            return searcSortData(input.toUpperCase(), '')
        } else if (input.length < 1) {
            if (usdtBtn)
                return sortData('', 'USDT')
            if (busdBtn)
                return sortData('', 'BUSD')
            if (bnbBtn)
                return sortData('', 'BNB')
            if (btcBtn)
                return sortData('', 'BTC')
        }


    }

    useEffect(() => {

        coinListener.current?.scrollToOffset({ animated: true, offset: 0 })


    }, [usdtBtn, busdBtn, bnbBtn, btcBtn])



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <SafeAreaView>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={searchInput}
                        onChangeText={setSearchInput}
                        placeholderTextColor={{ color: 'rgb(142,161,164)' }}
                        placeholder="Coinleri/İşlem Çiftlerini/Türevlerini Ara"
                        style={styles.searchInput} />
                </View>


                <View style={searchInput.length > 0 ? { justifyContent: 'center', alignItems: 'center', display: 'none' } : { justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.topMenu}>
                        <Text onPress={() => btnSelector(setBusdBtn)} style={busdBtn ? styles.topMenuTextActive : styles.topMenuText}> BUSD </Text>
                        <Text onPress={() => btnSelector(setUsdtBtn)} style={usdtBtn ? styles.topMenuTextActive : styles.topMenuText}> USDT </Text>
                        <Text onPress={() => btnSelector(setBnbBtn)} style={bnbBtn ? styles.topMenuTextActive : styles.topMenuText}> BNB </Text>
                        <Text onPress={() => btnSelector(setBtcBtn)} style={btcBtn ? styles.topMenuTextActive : styles.topMenuText}> BTC </Text>
                    </View>
                </View>
            </SafeAreaView>

            <FlatList
                data={lastResults(searchInput)}
                keyExtractor={(item, index) => index.toString()}
                ref={coinListener}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshControl}
                        onRefresh={_onRefresh}
                        title="Binance.com"
                        tintColor="#fcdb03"
                        titleColor="#000"
                    />
                }
                renderItem={({ item }) => (
                    <ListViewCard
                        firstCoinName={item.firstCoinName}
                        secondaryCoinName={item.secondaryCoinName}
                        symbol={item.symbol}
                        price={item.price}
                        changePrice={item.priceChange}
                        volume={item.volume}
                    />
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    topMenu: {
        width: '92%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginBottom: 10
    },
    topMenuText: {
        fontWeight: '500',
        padding: 5
    },
    topMenuTextActive: {
        fontWeight: '500',
        padding: 5,
        backgroundColor: 'rgb(235,236,240)',
        color: '#eba834'
    },
    searchInput: {
        width: '90%',
        backgroundColor: 'rgb(234,235,239)',
        height: 35,
        borderRadius: 20,
        marginBottom: 5,
        paddingLeft: 20,
        marginBottom: 15
    }

})

export default Spot;