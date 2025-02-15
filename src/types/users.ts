export interface ITerms {
    id: number
    title: string
    isRequired: true
    contentUrl: string
}

export interface IRegisterResponse {
    terms: ITerms[]
}
