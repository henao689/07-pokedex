import { Image, FlatList, ActivityIndicator, Text, View } from "react-native";
import React from "react";
import { styles } from "../themes/appTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePokemonPagination } from "../hooks/usePokemonPagination";
import Pokemoncard from "../components/Pokemoncard";

export default function HomeScreen() {

  // obtener altura por defecto
  const { top } = useSafeAreaInsets();
  //hook que maneja la logica para obtener la lista de pokemones
  const { isLoading, pokemonList, loadPokemons } = usePokemonPagination();

  return (
    <View style={{alignItems:'center'}}>
      <Image
        source={require("../assets/pokebola.png")}
        style={styles.pokebolaBG}
      />
      {/* componente de react-native para crear listas */}
      <FlatList
        data={pokemonList}
        keyExtractor={(pokemon) => pokemon.id}
        renderItem={ ({ item }) => <Pokemoncard pokemon={item}/> }
        //columnas
        numColumns={2}
        //infinite scroll
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}

        ListHeaderComponent={<Text style={{...styles.title, top: top + 20, marginBottom: 40}}>Home Pokedex</Text>}
        ListFooterComponent={
          // indicador de carga del infinte scroll
          <ActivityIndicator style={{ height: 100 }} size={20} color={"gray"} />
        }
      />
    </View>
  );
}
