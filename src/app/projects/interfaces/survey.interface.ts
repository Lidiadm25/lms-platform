export interface Survey {
    id?: string;
    projectsId: string;
    questions:Question[];
    userAuthorId?:string;

}

export interface Question {
    id?:string;
    title: string;
    surveyId ?:string;
}

export interface SurveyUser {
    id?: string;
    surveyId: string;
    total?: number;
    userId?: string;
    answers?:Answer[]
}

export interface Answer {
    id?: string;
    questionsId: string;
    rating: number;
    responseId?: string;
}

export interface datasetSurvey{
    avg: string;
    course: string;
}