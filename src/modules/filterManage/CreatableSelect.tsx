import { Observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { SingleValue } from 'react-select'

import close from '../../assets/close.svg'
import plus from '../../assets/plus.svg'
import { InputWithAction } from '../../components/input/Input.tsx'
import { Item } from '../../components/item/Item.tsx'
import { Select } from '../../components/select/Select.tsx'
import { OptionType } from '../../components/select/Select.types.ts'
import { Color } from '../../styles/ts/colors.ts'
import { InlineContainer, InputFilterWrapper } from './CreatableSelect.styled.ts'
import { CreatableSelectProps } from './CreatableSelect.types.ts'
import { Attribute } from './CreatableSelectStore.ts'

export function CreatableSelect({ attributes, props }: { attributes: Attribute[]; props: CreatableSelectProps }) {
  const [attributeList, setAttributeList] = useState<Attribute[]>([])
  const [option, setOption] = useState<SingleValue<OptionType> | null>(null)
  const [value, setValue] = useState('')
  const onChangeKey = (event) => setOption(event)
  const onChangeValue = (event) => setValue(event.target.value)
  const onCreateAttribute = () => {
    if (option === null || value === null) return
    props.onCreate({ option, value })
  }

  useEffect(() => setAttributeList(attributes), [attributes])

  return (
    <Observer>
      {() => (
        <InlineContainer>
          <InputFilterWrapper>
            <Select
              isDisabled={false}
              loadOptions={props.loadOptions}
              onChange={onChangeKey}
              outlined={false}
              placeholder={props.placeholder}
              size={props.size}
            />
            <InputWithAction
              image={plus}
              onChange={onChangeValue}
              onClick={onCreateAttribute}
              size={props.size}
              styles={{
                wrapper: {
                  border: 'none',
                  borderBottomLeftRadius: 0,
                  borderLeft: `2px solid ${Color.WHITE}`,
                  borderTopLeftRadius: 0,
                },
              }}
            />
          </InputFilterWrapper>
          {attributeList.map((attribute) => (
            <Item image={close} onClick={() => props.onDelete(attribute)} size={props.size} text={`${attribute.option.label}: ${attribute.value}`} />
          ))}
        </InlineContainer>
      )}
    </Observer>
  )
}
