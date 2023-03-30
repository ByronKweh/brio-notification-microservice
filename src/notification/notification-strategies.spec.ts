import {
  HappyBirthdayStrategy,
  LeaveBalanceReminderStrategy,
  MonthlyPayslipStrategy,
  NotificationStrategy,
} from './notification-strategies';

describe('HappyBirthdayStrategy', () => {
  let strategy: NotificationStrategy;

  beforeEach(() => {
    strategy = new HappyBirthdayStrategy();
  });

  it('should execute the strategy correctly', async () => {
    // Add test code to simulate executing the strategy
  });
});

describe('LeaveBalanceReminderStrategy', () => {
  let strategy: NotificationStrategy;

  beforeEach(() => {
    strategy = new LeaveBalanceReminderStrategy();
  });

  it('should execute the strategy correctly', async () => {
    // Add test code to simulate executing the strategy
  });
});

describe('MonthlyPayslipStrategy', () => {
  let strategy: NotificationStrategy;

  beforeEach(() => {
    strategy = new MonthlyPayslipStrategy();
  });

  it('should execute the strategy correctly', async () => {
    // Add test code to simulate executing the strategy
  });
});
