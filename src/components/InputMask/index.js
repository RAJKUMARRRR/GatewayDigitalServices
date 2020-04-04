import React from 'react'
import { Text, View, StyleSheet } from 'react-native'


class InputMask extends React.Component{
    render(){
        const {style={}} = this.props
        return (
            <View style={{...styles.container,...style}}>
                <Text style={styles.number}>1</Text>
                <Text style={styles.number}>2</Text>
                <Text style={styles.number}>3</Text>
                <Text style={styles.number}>4</Text>
                <Text style={styles.number}>5</Text>
                <Text style={styles.number}>6</Text>
            </View>
        )
    }
}

export default InputMask

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    number:{
        color: '#c3c3c3',
        fontSize: 20,
        fontWeight:'bold',
        borderBottomColor: '#c3c3c3',
        borderBottomWidth: 1,
        paddingRight: 5,
        paddingLeft: 5,
        marginRight:10        
    }
})