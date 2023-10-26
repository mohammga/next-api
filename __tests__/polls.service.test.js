import * as pollsService from "@/app/features/polls/polls.service";

describe('Poll Service - Create', () => {
    it('should respond with error message when user does not exist', async () => {
      const title = 'Test Poll';
      const description = 'This is a test poll';
      const questions = ['Question 1', 'Question 2'];
      const email = 'nonexistent@example.com';
      const response = await pollsService.create({ title, description, questions, email });
      expect(response.success).toBe(false);
      expect(response.error).toBe('User with nonexistent@example.com does not exist');
      expect(response.data).toBeUndefined();
    });
  });

  

  