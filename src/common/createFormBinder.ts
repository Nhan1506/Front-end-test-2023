import { ChangeEvent } from "react"

export type ObjectValueType = boolean | number | string
export type ObjectType = Record<string, ObjectValueType>

export type UseFormResponse<State extends ObjectType> = {
  fields: State
  onChangeValue: (field: string, value: ObjectValueType) => void
}

const createTextFieldBinder = (formData: UseFormResponse<ObjectType>) => (field: keyof ObjectType) => ({
  name: field,
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    formData.onChangeValue(field, event.target.value)
  },
  value: formData.fields[field] ? formData.fields[field].toString() : "",
})

const createSubmitBinder =
  <State extends ObjectType>(formData: UseFormResponse<State>) =>
  (callback: (data: State) => void) => ({
    onSubmit: (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()
      callback(formData.fields)
    },
  })

export const createFormBinder = <State extends ObjectType>(formData: UseFormResponse<State>) => ({
  textField: createTextFieldBinder(formData),
  onSubmit: createSubmitBinder(formData),
})
