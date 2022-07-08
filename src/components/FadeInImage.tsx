import React, { useState } from 'react'
import { ActivityIndicator, Animated, ImageErrorEventData, ImageStyle, NativeSyntheticEvent, StyleProp, View } from 'react-native'
import { useAnimation } from '../hooks/useAnimation';


interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} } : Props) => {

    //se usa en hook para manejar la animacion de la imagen
    const { opacity, fadeIn } = useAnimation();
    //estado para manejar la carga de la imagen
    const [ isLoading, setIsLoading ] = useState( true );

    //al terminar la carga de la imagen quita elspiner y hace el fadeIn
    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    }

    const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
        setIsLoading( false );
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...style as any,
        }}>
            
            {
                isLoading && 
                    <ActivityIndicator 
                        style={{ position: 'absolute' }} 
                        color="grey"
                        size={ 30 }
                    />
            }

            <Animated.Image 
                source={{ uri }}
                onError={ onError } 
                onLoad={ finishLoading }
                style={{
                    ...style as any,
                    opacity
                }}
            />

        </View>
    )
}
