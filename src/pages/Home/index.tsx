import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CyclesContext } from '../../contexts/CyclesContext'
import { useContext } from 'react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please set a task'),
  minutesAmount: zod.number().min(1).max(60),
})

type NewType = zod.infer<typeof newCycleFormValidationSchema>

// usar type quando for criar uma tipagem vinda de outra referencia
// lembrando nao posso usar uma var js dentro do TS, pois o TS nao entende o JS, e assim tenho sempre de converter o JS numa tipagem
// e pra isso usa o typeof, sempre que quiser referenciar uma var js dentro do ts tem de usar o typeof, sempre que quiser

type NewCycleFormData = NewType

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }
  // mostrando o countdown na tela
  // se o ciclo estiver ativo, multiplica os minutos por 60

  const task = watch('task')
  const isSubmiteDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            disabled={isSubmiteDisabled}
            type="submit"
            id=""
          >
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
