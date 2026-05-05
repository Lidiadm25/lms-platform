export interface Survey {
    idProject: string;
    questions:Question[];
}

export interface Question {
    title: string;
    surveyId ?:string;
}