import { ApplicantStatusPipe } from './applicant-status.pipe';

describe('ApplicantStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ApplicantStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
