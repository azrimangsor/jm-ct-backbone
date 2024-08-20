import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {
  private passedCount = 0;
  private failedCount = 0;

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'passed') {
      this.passedCount++;
    } else if (result.status === 'failed' || result.status === 'timedOut') {
      this.failedCount++;
    }
  }

  onEnd() {
    console.log(`  Total tests passed: ${this.passedCount}`);
    console.log(`  Total tests failed: ${this.failedCount}`);
  }
}

export default CustomReporter;