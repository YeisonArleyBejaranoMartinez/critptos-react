import styled from '@emotion/styled'
const Resultados = styled.div `
color: #fff;
font-family: 'Lato', sans-serif;
display: flex;
align-items: center;
margin-top: 30px;
flex-direction: column;
`
const Texto = styled.p`
font-size: 18px;
span{
    font-weight: 700;
}
`
const Precio = styled.p `
font-size: 30px;
span{
    font-weight: 700;
}
`
const Imagen = styled.img`
display:block;
width: 120px;

`

const Resultado = ({resultado}) => {
    const {PRICE,HIGHDAY, LOWDAY, IMAGEURL, LASTUPDATE, CHANGE24HOUR } = resultado
  return (
    <Resultados>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto"/>
        <div>
        <Precio>El precio es de  <span>{PRICE}</span></Precio>
        <Texto>Precio mas alto del dia <span>{HIGHDAY}</span></Texto>
        <Texto>Precio mas  bajo del dia <span>{LOWDAY}</span></Texto>
        <Texto>Variacion de las  ultimas 24 horas <span>{CHANGE24HOUR}</span></Texto>
        <Texto>Ultima actualizacion <span>{LASTUPDATE}</span> </Texto>
        </div>
    </Resultados>
  )
}

export default Resultado