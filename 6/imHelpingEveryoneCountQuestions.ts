import { intersection, union } from "./utils/set.ts";

interface QuestionGroup {
  /** The questions answered by each invididual person in this group */
  individuals: Set<string>[];

  /** Which questions were answered by anyone in the group */
  answers: Set<string>;

  /** Which questions were answered by everyone in the group */
  groupAnswers: Set<string>;
}

const getAnswerSet = (answers: string) => (
  new Set(answers.split(""))
);

export const parseQuestionGroup = (questionGroup: string): QuestionGroup => {
  const individuals = questionGroup.split(/\n/).map(getAnswerSet);
  const answers = union(individuals);
  const groupAnswers = intersection(individuals);

  return {
    individuals,
    answers,
    groupAnswers,
  };
};

export const countTotalAnsweredQuestions = (
  questionGroups: QuestionGroup[],
) => (
  questionGroups.reduce(
    (total, group) => total + group.answers.size,
    0,
  )
);

export const countGroupAnsweredQuestions = (
  questionGroups: QuestionGroup[],
) => (
  questionGroups.reduce(
    (total, group) => total + group.groupAnswers.size,
    0,
  )
);
