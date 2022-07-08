import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../Navigation/Tab1'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

const PokemonScreen = ({navigation,route}: Props) => {

  // props enviadas mediante Props
  const {simplePokemon,color} = route.params
  //desetructurar simplePokemon
  const {name,id,feature} = simplePokemon
  // obtener altura por defecto
  const {top} = useSafeAreaInsets()

  //hook de peticiones a api del pokemon actual
  const { isLoading, pokemon } = usePokemon(id);

  return (
    <View style={{flex:1}}>

      <View style={{
        ...styles.headerContainer,
        backgroundColor: color,
      }}>

        {/* button de volver */}
        <TouchableOpacity
          onPress={()=> navigation.pop()}
          activeOpacity={.8}
          style={{...styles.backButton, top: top +8}}
        >
          <Icon
            name='arrow-back-outline'
            color={'white'}
            size= {30}
          />
        </TouchableOpacity>

        {/* {nombre} */}
        <Text style={styles.pokemonName}>{name}{'\n#'+ id}</Text>

        {/* imagen pokebola */}
        <Image
          source={require("../assets/pokebola-blanca.png")}
          style={styles.pokebola}
        />

        {/* imagen pokemon */}
        <FadeInImage
          uri={feature}
          style={styles.pokemonImage}
        />
      </View>

      {/* Detalles pokemon */}
        {
          isLoading
             ? (<View style={styles.activityIndicator}>
                <ActivityIndicator color={color} size={50}/>
              </View>)
            : <PokemonDetails pokemon={pokemon!}/>
        }
        
    </View>
  )
}

export default PokemonScreen

const styles = StyleSheet.create({
  headerContainer: {
    height:370,
    zIndex: 100,
    alignItems: 'center',
    borderBottomRightRadius:1000,
    borderBottomLeftRadius: 1000,
  },
  backButton:{
    position: 'absolute',
    left:  10
  },
  pokemonName: {
    color: '#fff',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 18,
    top: 40
  },
  pokebola: {
    bottom: 5,
    height:300,
    opacity: .5,
    position: 'absolute',
    width: 300,
  },
  pokemonImage: {
    height:250,
    width:250,
    bottom: -15
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})