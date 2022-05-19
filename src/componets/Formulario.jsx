import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import {monedas} from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input `
background-color: #9497FF;
border: none;
width: 100%;
padding: 10px;
color: #fff;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius:5px;
transition: background-color .3s ease;
margin-top: 30px;
cursor: pointer;
&:hover{
    background-color: #7a7dfe;
    cursor: pointer; 
}
`
const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos]= useState([])
    const [errores, setErrores]= useState(false);
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas('Elige tu cripto moneda', criptos)
    const hadleSubmit = (e)=>{
      e.preventDefault()
      console.log("Hola");
      if([moneda, criptoMoneda].includes('')){
        setErrores(true);
        return
      }
      setErrores(false);
      setMonedas({
        moneda,
        criptoMoneda
      })
    }

     /*proceso para  consumir una  api. */
  useEffect(()=>{
    const consultarAPI = async()=>{
     const url= "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
     const respuesta = await fetch(url);
     const resultado =  await respuesta.json();
     const arrayCriptos = resultado.Data.map((cripto)=>{
     const objeto ={
       id: cripto.CoinInfo.Name,
       nombre: cripto.CoinInfo.FullName
     }
      return objeto
     })
     setCriptos(arrayCriptos)
    }
    consultarAPI();
 }, [])

    SelectMonedas();
  return (
    <>
    {errores?(<Error>Todos los campos snon obligatorios</Error>): null}
      <form
      onSubmit={hadleSubmit}
      >
          <SelectMonedas/>
          <SelectCriptoMoneda/>   
          <InputSubmit type="submit"  value="cotizar"/>
      </form>
    </>
  )
}

export default Formulario