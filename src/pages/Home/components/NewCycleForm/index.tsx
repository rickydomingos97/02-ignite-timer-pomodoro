import { useForm } from 'react-hook-form'
import { FormContainer, MinutesAmounInput, TaskInput } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please set a task'),
  minutesAmount: zod.number().min(1).max(60),
})

// usar type quando for criar uma tipagem vinda de outra referencia
// lembrando nao posso usar uma var js dentro do TS, pois o TS nao entende o JS, e assim tenho sempre de converter o JS numa tipagem
// e pra isso usa o typeof, sempre que quiser referenciar uma var js dentro do ts tem de usar o typeof, sempre que quiser

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {},
  })

  return (
    <FormContainer>
      <label htmlFor="task">I will work on</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Give a name to your project"
        disabled={!!activeCycle} /** dois !! pois tem de ser um boolean */
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
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes</span>
    </FormContainer>
  )
}
