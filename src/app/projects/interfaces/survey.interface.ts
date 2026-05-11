export interface Survey {
    id?: string;
    idProject: string;
    questions:Question[];
}

export interface Question {
    title: string;
    surveyId ?:string;
}