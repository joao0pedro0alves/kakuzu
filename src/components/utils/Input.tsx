import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
}

export const Input = forwardRef<any, InputProps>(({ label, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className='text-gray-700 dark:text-gray-500 text-xs font-semibold' htmlFor={props.name}>{label}</label> }
        <input
          ref={ref}
          className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-orange-500 dark:focus:outline-gray-800 border border-transparent data-[error=true]:border-red-500"
          data-error={errorMessage ? 'true' : 'false'}
          {...props}
        />

        {errorMessage && (
          <span className="text-xs pl-4 text-red-700 font-semibold">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)
