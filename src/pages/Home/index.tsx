import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmounInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

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
}
// passando um objeto de configuracoes no useForm
export function Home() {
  //
  const [cycles, setCycles] = useState<Cycle[]>([])

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {},
  })

  // integrando o o formalario com ts

  function handleCreateNewCycle(data: NewCycleFormData) {
    // aqui dentro vamos criar os novos ciclos
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // id criado com os millisegundos do time do computador em formato de string
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])

    reset()
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmiteDisabled} type="submit" id="">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
