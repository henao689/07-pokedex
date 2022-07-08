import { useState, useEffect } from 'react';

//hook que recibe dos parametros un texto para buscar y u tiempo que tarda en ejecurse
export const useDebouncedValue = ( input: string = '', time: number = 500 ) => {

    //estado para manejar el text input
    const [debouncedValue, setDebouncedValue] = useState(input);

    //cada que cambie el input se dispara esta funcionalidad
    useEffect(() => {
        
        //un settimeout que cambia el estado segun el tiempo y el texto del input enviado
        const timeout = setTimeout( () => {
            setDebouncedValue( input );
        }, time )

        //se termina el timeout al terminarse la ejecucion del componente
        return () => {
            clearTimeout( timeout );
        }
    }, [input])


    return debouncedValue;
}
