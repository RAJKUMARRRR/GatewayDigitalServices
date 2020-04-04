import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


class KeyPad extends React.Component {
    render() {
        return (
            <View style={styles.containe}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                <TouchableOpacity style={{...styles.rowItem,...styles.numGrey}}>
                        <Text style={styles.numText}></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem}>
                        <Text style={styles.numText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.rowItem,...styles.numGrey}}>
                        <Text style={styles.numText}>*</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default KeyPad

const styles = StyleSheet.create({
    containe: {
        flex: 1,
    },
    row:{
        flex:1,
        flexDirection:'row',
        marginBottom:1
    },
    rowItem:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        marginRight:1
    },
    numText:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold'
    },
    numGrey:{
        backgroundColor:'#f1f1f1'
    }
})