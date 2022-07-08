import { useRef } from 'react';
import { Animated } from 'react-native';


export const useAnimation = () => {

    //se manejan referencias para manejar los valores de la animacion
    const opacity  = useRef( new Animated.Value(0) ).current;
    const position = useRef( new Animated.Value(0) ).current;

    //fade de entrada la opacidad toma el valor de 0 y en 300 ms cambia a 1
    const fadeIn = ( duration: number = 300 ) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration,
                useNativeDriver: true
            }
        ).start();
    }

    //fade de salida es lo ccontraro al fadeIn
    const fadeOut = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }


    const startMovingPosition = ( initPosition: number, duration: number = 300 ) => {

        position.setValue(initPosition);

         Animated.timing(
            position,
            {
                toValue: 0,
                duration,
                useNativeDriver: true,
                // easing: Easing.bounce
            }
        ).start();
    }


    return {
        opacity,
        position,
        fadeIn,
        fadeOut,
        startMovingPosition
    }
}
