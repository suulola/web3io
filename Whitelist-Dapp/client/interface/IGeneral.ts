export type feedback_type = 'error' | 'info' | 'loading'

export interface IError {
  value: string
  type: feedback_type
}
