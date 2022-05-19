import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./img/imagenCripto.jpg";
import Formulario from "./componets/Formulario";
import Resultado from "./componets/Resultado";
import Spiner from "./componets/Spiner";


const HeadImg = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after {
    content: " ";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    margin: 10px auto;
    display: block;
  }
`;
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  justify-content: center;
  align-items: center;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 250px;

  margin: 0 auto;
  width: 98%;
`;
function App() {
  const [count, setCount] = useState(0);
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando]= useState(false);
  useEffect(() => {
    if (Object.keys(monedas).length) {
      const { moneda, criptoMoneda } = monedas;
      const cotizadorCripto = async () => {
        setCargando(true)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptoMoneda][moneda])
        setCargando(false)
        
      };
      cotizadorCripto();
    }
  }, [monedas]);
  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagenes critomonedas" />
      <div>
        <HeadImg>Cotiza Criptomonedas al instante</HeadImg>
        <Formulario setMonedas={setMonedas} />
        {cargando && <Spiner/>}
        {resultado.PRICE &&  <Resultado resultado={resultado}/> }
      </div>
      
       
      
     
    </Contenedor>
  );
}

export default App;
