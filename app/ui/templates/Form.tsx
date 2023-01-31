/* eslint-disable @typescript-eslint/no-explicit-any */
import { BackspaceIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import classnames from 'classnames'
import omit from 'lodash-es/omit'
import { useRouter } from 'next/navigation'
import React, { FC, FormEvent } from 'react'
import Select, { components, CSSObjectWithLabel } from 'react-select'
import CreatableSelect from 'react-select/creatable'

type Props = {
  onSubmit: (e: FormEvent) => void
  children: any
}

type Subcomponents = {
  Header: FC<{ children: string }>
  Body: FC<{ children: any }>
  Field: FC<{
    children: any
    label: any
    error?: string
    prefix?: string
    icon?: any
  }>
  Select: typeof Select
  CreatableSelect: typeof CreatableSelect
  Footer: FC<{ pristine?: boolean; errors?: string[]; onCancel?: () => void }>
}

const Form: FC<Props> & Subcomponents = ({ onSubmit, children }) => (
  <form className="@container" onSubmit={onSubmit}>
    {children}
  </form>
)

Form.Header = function Header({ children }) {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        {children}
      </h3>
    </div>
  )
}

Form.Body = function Body({ children }) {
  return (
    <div className="grid gap-2 p-5 @lg:grid-cols-[1fr_3fr] @lg:items-start @lg:gap-4">
      {children}
    </div>
  )
}

Form.Field = function Field({ children, label, error, prefix, icon }) {
  return (
    <>
      {React.cloneElement(label, {
        className:
          label.props.className ||
          'block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2',
      })}
      <div className="mt-1 sm:mt-0">
        {children.type === 'div' || children.type === 'label' ? (
          children
        ) : (
          <div
            className={classnames('relative flex rounded-md shadow-sm', {
              'w-min': /w-/.test(children.props.className),
            })}
          >
            {!!prefix && (
              <span className="flex max-w-[30%] items-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                <span
                  className="overflow-hidden text-ellipsis"
                  style={{ direction: 'rtl' }}
                >
                  {prefix}
                </span>
              </span>
            )}
            {React.cloneElement(children, {
              className: classnames(
                'block flex-1 focus:border-accent focus:ring-accent sm:text-sm',
                children.props.className,
                prefix ? 'rounded-r-md' : 'rounded-md',
                error ? 'border-red-400' : 'border-gray-300'
              ),
            })}
            {icon && (
              <div className="absolute right-2 top-[7px] h-6 w-6">{icon}</div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

const selectProps = {
  className: 'text-sm relative z-20',
  classNames: {
    control: ({ isFocused }: { isFocused: boolean }) =>
      '!rounded-md shadow-sm px-px ring-1 ' +
      (isFocused
        ? '!border-accent ring-accent'
        : '!border-gray-300 ring-transparent'),
  },
  styles: {
    control: (base: CSSObjectWithLabel) => ({
      ...omit(base, 'boxShadow'),
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...omit(base, 'color'),
    }),
    multiValue: (base: CSSObjectWithLabel) => ({
      ...base,
      transform: 'translateX(-6px)',
      margin: 3,
      borderRadius: 3,
    }),
    input: (base: CSSObjectWithLabel) => ({
      ...base,
      'input:focus': {
        boxShadow: 'none',
      },
    }),
  },
  components: {
    DropdownIndicator: (props: any) => (
      <components.DropdownIndicator {...props}>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </components.DropdownIndicator>
    ),
    ClearIndicator: ({ innerProps }: any) => (
      <div {...innerProps}>
        <BackspaceIcon className="h-4 w-4 cursor-pointer text-gray-500" />
      </div>
    ),
    IndicatorSeparator: null,
  },
}

Form.Select = function StyledSelect(props) {
  return (
    <Select
      {...selectProps}
      {...props}
      components={{
        ...selectProps.components,
        ...props.components,
      }}
    />
  )
}

Form.CreatableSelect = function StyledCreatableSelect(props) {
  return (
    <CreatableSelect
      {...selectProps}
      {...props}
      components={{
        ...selectProps.components,
        ...props.components,
      }}
    />
  )
}

Form.Footer = function Footer({ pristine, errors, onCancel }) {
  const router = useRouter()
  onCancel ??= () => confirm('Are you sure?') && router.back()

  return (
    <div className="sticky bottom-0 z-10 border-t border-gray-200 bg-white p-5 py-4">
      <div className="flex items-center justify-end gap-4">
        {errors?.map((error) => (
          <div className="text-sm text-red-600" key={error}>
            {error}
          </div>
        ))}
        {!pristine && (
          <button type="button" className="button secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={pristine}
          className={classnames('button', { primary: !pristine })}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default Form
