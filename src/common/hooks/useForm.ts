import { useEffect, useState } from "react"
import { ObjectType, ObjectValueType, UseFormResponse } from "../createFormBinder"

export const useForm = <State extends ObjectType>(initialState: State): UseFormResponse<State> => {
  const [fields, setFields] = useState<State>(initialState)

  useEffect(() => {
    setFields(initialState)
  }, [initialState])

  const onChangeValue = (field: keyof State, value: ObjectValueType) => {
    setFields({
      ...fields,
      [field]: value,
    })
  }

  return {
    fields,
    onChangeValue,
  }
}
