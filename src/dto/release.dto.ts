
export type ReleaseNote = {
    id: string;
    topic: string;
    description: string
    noteType: NoteType;
    companyCode?: number;
    developerId: string;
    link?: string;
    releaseId?: string;
};

export type Developer = {
    id: string;
    name: string;
};

export type Company = {
    id: string;
    name: string;
    code: number;
};

export enum NoteType {
    FEATURE = 0,
    BUGFIX = 1,
    IMPROVEMENT = 2,
}

export enum ReleaseStatus {
    DRAFT = 0,
    PUBLISHED = 1,
}

export type Release = {
    id: string;
    description?: string;
    status?: ReleaseStatus;
    code: string;
    releaseDate: string;
    releaseNotes?: ReleaseNote[];
};