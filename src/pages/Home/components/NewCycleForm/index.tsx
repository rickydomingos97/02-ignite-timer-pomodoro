import { FormContainer, MinutesAmounInput, TaskInput } from './styles'

export function NewCycleForm() {
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
