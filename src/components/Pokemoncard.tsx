import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SimplePokemon } from '../interfaces/PokemonInterfaces'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImageColors from 'react-native-image-colors'
import { FadeInImage } from './FadeInImage'
import { useNavigation } from '@react-navigation/native'

//del¡clarar interface de las props del componente basado en una interface creada
interface Props {
    pokemon:SimplePokemon
}
//obterner dimiensiones de la vista
const windowWidth = Dimensions.get('window').width

const Pokemoncard = ({pokemon}:Props) => {

    // estado para manejar el color de fondo del card
    const [bgColor, setBgColor] = useState('gray')
    // referencia usada para administrar el desmonte del componente
    const isMounted = useRef(true);
    // navegar entre vistas
    const navigation = useNavigation<any>();

    useEffect(() => {
        // obtener colores del elemento card
        ImageColors.getColors(pokemon.feature, {fallback: 'grey'}).then(
          (colors: any) => {

            if(!isMounted.current) return;

            colors.platform === 'android'
              ? setBgColor(colors.dominant || 'grey')
              : setBgColor(colors.background || 'grey');
          },
        );
        return()=>{
            isMounted.current = false
        }
      }, []);
    
  return (
    <TouchableOpacity 
        activeOpacity={.8} 
        // mandar parametros a la vista a la cual se b¡va navegar
        onPress={()=> navigation.navigate('PokemonScreen',{simplePokemon: pokemon, color: bgColor})}
    >
        <View style={{...styles.cardContainer, width: windowWidth * 0.45, backgroundColor: bgColor}}>
            <Text style={styles.textName}>
                {pokemon.name}
                {'\n#'+ pokemon.id}
            </Text>
            <View style={styles.pokebolaContainer}>
                <Image
                    source={require("../assets/pokebola-blanca.png")}
                    style={styles.pokebola}
                />
            </View>
            {/* //componente que recibe una imagen y un estilo predefinido que hace efecto fade y administra la carga */}
            <FadeInImage uri={pokemon.feature} style={styles.pokemonImg} />
        </View>
    </TouchableOpacity>
  )
}

export default Pokemoncard

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        height: 130,
        marginBottom:30,
        marginHorizontal:10,
        //overflow: 'hidden',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textName: {
        color: '#fff',
        fontSize:20,
        fontWeight: 'bold'
    },
    pokebolaContainer: {
        bottom: 0,
        height:100,
        opacity: .5,
        position: 'absolute',
        overflow: 'hidden',
        right: 0,
        width: 100,
    },
    pokebola: {
        bottom: -15,
        height:100,
        opacity: .5,
        position: 'absolute',
        right: -15,
        width: 100,
    },
    pokemonImg: {
        height: 120,
        position: 'absolute',
        bottom: -5,
        right: -7,
        width: 120,
    }
})