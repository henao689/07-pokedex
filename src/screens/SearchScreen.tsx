import {
  View,
  Text,
  Platform,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchInput from "../components/SearchInput";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import { Loading } from "../components/Loading";
import { styles as globalStyles } from "../themes/appTheme";
import Pokemoncard from "../components/Pokemoncard";
import { SimplePokemon } from "../interfaces/PokemonInterfaces";

//obtener dimensiones de la vista
const screenWidth = Dimensions.get("window").width;

const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  //hook para hacer peticiones de pokemons a la api
  const { isFetching, pokemonList } = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])
  // estado que maneja el termino de busqueda
  const [termSearch, setTermSearch] = useState("");

  //se dispara esta funcion siempre que cambie el termino de busqueda
  useEffect(() => {
    //si el termino de busqueda esta vacio retorna un array vacio al estado
    if(termSearch.length < 1){
      return  setPokemonFiltered([]);
    }

    //se convierte el termino de vusqueda a numero y se valida sino es numero para hacer filtro por nombre
    if( isNaN(Number(termSearch)) ){
      setPokemonFiltered(pokemonList.filter( pok => (
        pok.name.includes(termSearch.toLowerCase())
      )))
    }else{
      //si es numero se hace la busqueda por id 
      const pokemonById =  pokemonList.find( pok => pok.id === termSearch)
      //se valida si pokemonById existe para setear el estado y como retorna un unico elemento se encierra entre corchtes para especificarlo como un array
      setPokemonFiltered( pokemonById ? [pokemonById] : [])
    }
  
  }, [termSearch])
  

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        ...styles.container,
        marginTop: top, //(Platform.OS === 'ios') ? top : top + 10
      }}
    >
      <SearchInput
        //actualizar termino de busqueda desde el searchInput
        onDebounce={(value) => setTermSearch(value)}
        style={{
          position: "absolute",
          zIndex: 999,
          width: screenWidth - 20,
          top: Platform.OS === "ios" ? top : top + 30,
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        // Header
        ListHeaderComponent={
          <Text
            style={{
              ...globalStyles.title,
              ...globalStyles.globalMargin,
              paddingBottom: 10,
              marginTop: Platform.OS === "ios" ? top + 60 : top + 80,
            }}
          >
            {termSearch}
          </Text>
        }
        renderItem={({ item }) => <Pokemoncard pokemon={item} />}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
