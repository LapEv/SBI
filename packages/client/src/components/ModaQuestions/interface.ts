export interface IModalChangeName {
  handleModal: (state: boolean) => void
  question?: string
  label?: string
  answer: (answer: boolean, text: string) => void
}
