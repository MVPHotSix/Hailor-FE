export interface IRegion {
    id: number
    name: string
}

export interface Designer {
    id: number
    name: string
    region: string // ex: "서울전체", "홍대/연남/합정", "강남/청담/압구정", "성수/건대"
    shopAddress: string
    profileImageURL: string // 이미지 URL
    specialization: string[] // ex: ["컷", "펌", "염색", "탈염색"]
    consultingFee: number
    introduction: string
    description: string
    offlinePrice: number
    onlinePrice: number
}
