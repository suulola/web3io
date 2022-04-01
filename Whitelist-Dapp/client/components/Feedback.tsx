import React from 'react'
import { feedback_type } from '../interface/IGeneral'

interface IFeedback {
  errorMessage: string
  type: feedback_type
}

const Feedback = ({ errorMessage, type }: IFeedback) => {
  return (
    <>
      {
        <div>
          {type === 'loading' ? (
            <></>
          ) : errorMessage !== '' ? (
            <div
              className={` ${
                type === 'error' ? `bg-red-900` : `bg-indigo-900`
              } text-center py-4 lg:px-4`}
            >
              <div
                className={`p-2 ${
                  type === 'error' ? `bg-red-800` : `bg-indigo-800`
                } items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex`}
                role='alert'
              >
                <span
                  className={`flex rounded-full ${
                    type === 'error' ? `bg-red-500` : `bg-indigo-500`
                  } uppercase px-2 py-1 text-xs font-bold mr-3`}
                >
                  {type === 'error' ? `Error` : `Info`}
                </span>
                <span className='font-semibold mr-2 text-left flex-auto'>
                  {errorMessage}
                </span>
                <svg
                  className='fill-current opacity-75 h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z' />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
      }
    </>
  )
}

export default Feedback
