import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmounInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { differenceInSeconds } from 'date-fns'
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please set a task'),
  minutesAmount: zod.number().min(5).max(60),
})

// usar type quando for criar uma tipagem vinda de outra referencia
// lembrando nao posso usar uma var js dentro do TS, pois o TS nao entende o JS, e assim tenho sempre de converter o JS numa tipagem
// e pra isso usa o typeof, sempre que quiser referenciar uma var js dentro do ts tem de usar o typeof, sempre que quiser

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}
// passando um objeto de configuracoes no useForm
export function Home() {
  //
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // armazena os segundos que ja passaram desde a criacao do cliclo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {},
  })

  // nos mostra qual o id do ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
  }, [activeCycle])

  // integrando o o formalario com ts

  function handleCreateNewCycle(data: NewCycleFormData) {
    // aqui dentro vamos criar os novos ciclos
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // id criado com os millisegundos do time do computador em formato de string
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  // mostrando o countdown na tela
  // se o ciclo estiver ativo, multiplica os minutos por 60
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  // mostra o tempo que falta pra terminar o tempo
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  // convertendo pra mostrar em tela,
  // e lembrar de mostrar o numero convertido pra baixo
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60 // quantos segundos sobram de 60 no resto da divisao
  // isso vai mostrar em tela um 0 no inicio do numero se o numero for menor que 10
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  console.log(activeCycle)

  const task = watch('task')
  const isSubmiteDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give a name to your project"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmounInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmiteDisabled} type="submit" id="">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
