import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-screens";
import Icon from "react-native-vector-icons/Ionicons";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

interface Props {
  onDebounce: ( value: string ) => void;
  style?: StyleProp<ViewStyle>;
}

const SearchInput = ({ style, onDebounce }: Props) => {
  //estado para manejar el valor del input
  const [textValue, setTextValue] = useState("");

  //el valor del input se envia al hook debouncer y este lo retorna 700ms despues
  const debouncedValue = useDebouncedValue(textValue, 700);

  useEffect(() => {
    onDebounce(debouncedValue)
  }, [debouncedValue])
  
  return (
    <View
      style={{
        ...styles.container,
        ...(style as any),
      }}
    >
      <View style={styles.textBackground}>
        {/* input del buscador */}
        <TextInput
          placeholder="Buscar pokémon"
          placeholderTextColor={"grey"}
          style={{
            ...styles.textInput,
            top: Platform.OS === "ios" ? 0 : 2,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />

        <Icon name="search-outline" color="grey" size={25} />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: "#F3F1F3",
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: "grey",
  },
});
