import { expect, describe, it } from 'vitest';
import { questions } from '../lib/data.json';

describe('Quiz Questions', () => {
    it('should be an array', () => {
        expect(Array.isArray(questions)).toBe(true);
    });

    it('Each question should have a title, answers and helper', () => {
        questions.forEach(question => {
            expect(question.title).toBeDefined();
            expect(question.answers.length).toBeGreaterThan(0);
            expect(question.helper.text).toBeDefined();
        });
    });

    it('Each question should have one and only one correct answer', () => {
        questions.forEach(question => {
            const correctAnswers = question.answers.filter(answer => answer.correct);
            expect(correctAnswers.length).toBe(1);
        });
    });

    it('Should identify the correct answers for all questions', () => {
        const expectedAnswers = ["Tesla", "Sverige", "Øke kraften", "Audi"];
        
        questions.forEach((question, index) => {
            const correctAnswer = question.answers.find(answer => answer.correct);
            expect(correctAnswer.answer).toBe(expectedAnswers[index]);
        });
    });

    it('Each question should have a unique title', () => {
        const titles = questions.map(q => q.title);
        const uniqueTitles = new Set(titles);
        expect(titles.length).toBe(uniqueTitles.size);
    });

    it('Each answer within a question should be unique', () => {
        questions.forEach(question => {
            const answers = question.answers.map(a => a.answer);
            const uniqueAnswers = new Set(answers);
            expect(answers.length).toBe(uniqueAnswers.size);
        });
    });

    it('Each question structure should be valid', () => {
        questions.forEach(question => {
            expect(typeof question.title).toBe('string');
            expect(Array.isArray(question.answers)).toBe(true);
            question.answers.forEach(answer => {
                expect(typeof answer.answer).toBe('string');
                
                if ('correct' in answer) {
                    expect(typeof answer.correct).toBe('boolean');
                }
            });
        });
    });
    
});

