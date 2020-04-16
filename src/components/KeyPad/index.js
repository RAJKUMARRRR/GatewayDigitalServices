import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


class KeyPad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: ""
        }
    }

    onTapHnadler = (num)=>{
        const { onChange, max } = this.props
        if(this.state.input.length>=10){
            return;
        }
        this.setState((prevState)=>({
            input: prevState.input+num
        }),()=>{
            onChange(this.state.input);
        });
    }

    onClearHandler = ()=>{
        if(this.state.input.length<=0){
            return;
        }
        const { onChange } = this.props
        this.setState((prevState)=>({
            input: prevState.input.substring(0,prevState.input.length-1)
        }),()=>{
            onChange(this.state.input);
        });
    }

    render() {
        const { onTapHnadler, onClearHandler } = this
        return (
            <View style={styles.containe}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(1)}>
                        <Text style={styles.numText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(2)}>
                        <Text style={styles.numText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(3)}>
                        <Text style={styles.numText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(4)}>
                        <Text style={styles.numText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(5)}>
                        <Text style={styles.numText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(6)}>
                        <Text style={styles.numText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(7)}>
                        <Text style={styles.numText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(8)}>
                        <Text style={styles.numText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(9)}>
                        <Text style={styles.numText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                <TouchableOpacity style={{...styles.rowItem,...styles.numGrey}}>
                        <Text style={styles.numText}></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={()=>onTapHnadler(0)}>
                        <Text style={styles.numText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.rowItem,...styles.numGrey}} onPress={onClearHandler}>
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