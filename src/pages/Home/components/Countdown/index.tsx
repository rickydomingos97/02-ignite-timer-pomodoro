import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CyclesContext)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // calcula os seg passados desde o inicio do cliclo

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    // dentro do useEffect podemos ter um retorno que sempre retorna uma funcaoncom arrow function sem parametro
    // vou deletar os intervalos criados anteriorm,ente aqui nessa funcao
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds, markCurrentCycleAsFinished])

  // mostra o tempo que falta pra terminar o tempo
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  // convertendo pra mostrar em tela,
  // e lembrar de mostrar o numero convertido pra baixo
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60 // quantos segundos sobram de 60 no resto da divisao
  // isso vai mostrar em tela um 0 no inicio do numero se o numero for menor que 10
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // useEffect para mostrar o contador na aba da pagina
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - Ignite Timer`
    } else {
      document.title = `Ignite Timer`
    }
  }, [minutes, seconds, activeCycle])

  console.log(activeCycle)

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
